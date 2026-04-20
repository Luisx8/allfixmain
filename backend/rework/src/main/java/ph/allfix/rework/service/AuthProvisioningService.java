package ph.allfix.rework.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;
import ph.allfix.rework.util.CryptoUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

/**
 * Centralized user provisioning flow.
 *
 * Prioritizes Lambda pre-registration when configured, then enforces Cognito
 * user provisioning before any downstream session is created/cached.
 */
@Slf4j
@Service
public class AuthProvisioningService {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final CognitoService cognitoService;
    private final LambdaClient lambdaClient;

    @Value("${auth.lambda-auth-arn:}")
    private String lambdaAuthArn;

    @Value("${cognito.user-pool-id}")
    private String userPoolId;

    @Value("${auth.strict-cognito-provisioning:true}")
    private boolean strictCognitoProvisioning;

    @Value("${auth.lambda-only-provisioning:false}")
    private boolean lambdaOnlyProvisioning;

    @Value("${pms.backend-secret:}")
    private String pmsBackendSecret;

    public AuthProvisioningService(CognitoService cognitoService, LambdaClient lambdaClient) {
        this.cognitoService = cognitoService;
        this.lambdaClient = lambdaClient;
    }

    public ProvisioningResult provisionPmsUser(String email, String pmsUserId, String cognitoGroup, String source) {
        return provisionPmsUser(email, pmsUserId, cognitoGroup, source, null);
    }

    public ProvisioningResult provisionPmsUser(String email, String pmsUserId, String cognitoGroup, String source, String displayName) {
        String correlationId = UUID.randomUUID().toString();
        boolean lambdaInvoked = false;
        String lambdaRequestId = null;
        LambdaProvisioningResult lambdaProvisioningResult = null;

        log.info("[corrId={}] Starting user provisioning: pmsUserId={}, email={}, group={}, source={}, lambdaOnlyProvisioning={}, strictCognitoProvisioning={}, lambdaArnConfigured={}",
            correlationId,
            pmsUserId,
            email,
            cognitoGroup,
            source,
            lambdaOnlyProvisioning,
            strictCognitoProvisioning,
            lambdaAuthArn != null && !lambdaAuthArn.isBlank());

        if (lambdaAuthArn != null && !lambdaAuthArn.isBlank()) {
            lambdaProvisioningResult = invokeLambdaPreRegister(email, pmsUserId, cognitoGroup, source, correlationId, displayName);
            lambdaRequestId = lambdaProvisioningResult.lambdaRequestId();
            lambdaInvoked = true;
        }

        if (lambdaOnlyProvisioning) {
            if (!lambdaInvoked) {
                throw new RuntimeException("Lambda-only provisioning is enabled, but LAMBDA_AUTH_ARN is not configured");
            }

            String lambdaUsername = lambdaProvisioningResult != null ? lambdaProvisioningResult.cognitoUsername() : null;
            String effectiveUsername = firstNonBlank(
                lambdaUsername,
                cognitoService.resolveCognitoUsername(pmsUserId, email),
                email
            );

            String lambdaSub = lambdaProvisioningResult != null ? lambdaProvisioningResult.cognitoSub() : null;
            cognitoService.ensureProfileAttributes(effectiveUsername, email, pmsUserId, displayName);
            if (lambdaSub == null || lambdaSub.isBlank()) {
                lambdaSub = resolveCognitoSubFallback(effectiveUsername, email, pmsUserId, correlationId);
            }
            if (lambdaSub == null || lambdaSub.isBlank()) {
                throw new RuntimeException("Lambda-only provisioning could not resolve Cognito sub from Lambda response or Cognito user lookup");
            }

            log.info("[corrId={}] Lambda-only provisioning completed: cognitoUsername={}, cognitoSub={}",
                correlationId, effectiveUsername, lambdaSub);

            return new ProvisioningResult(effectiveUsername, lambdaSub, true, correlationId, lambdaRequestId);
        }

        String cognitoUsername = cognitoService.getOrCreateUser(email, pmsUserId, displayName);
        cognitoService.addUserToGroup(cognitoUsername, cognitoGroup);
        String cognitoSub = cognitoService.getRequiredUserSub(cognitoUsername);

        log.info("[corrId={}] Cognito provisioning completed: cognitoUsername={}, cognitoSub={}",
            correlationId, cognitoUsername, cognitoSub);

        if (strictCognitoProvisioning && (cognitoSub == null || cognitoSub.isBlank())) {
            throw new RuntimeException("Strict Cognito provisioning enabled, but Cognito sub is missing");
        }

        return new ProvisioningResult(cognitoUsername, cognitoSub, lambdaInvoked, correlationId, lambdaRequestId);
    }

    private LambdaProvisioningResult invokeLambdaPreRegister(String email, String pmsUserId, String cognitoGroup, String source, String correlationId, String displayName) {
        try {
            String ts = String.valueOf(System.currentTimeMillis() / 1000L);
            String role = (cognitoGroup == null || cognitoGroup.isBlank()) ? "customers" : cognitoGroup;
            String name = (displayName == null || displayName.isBlank()) ? email : displayName;

            // PMS preregister contract signs userId|email|role|ts with PMS_BACKEND_SECRET.
            String sig = (pmsBackendSecret == null || pmsBackendSecret.isBlank())
                ? ""
                : CryptoUtils.generateHMACHex(pmsUserId + "|" + email + "|" + role + "|" + ts, pmsBackendSecret);

            Map<String, Object> payload = new HashMap<>();
            payload.put("userId", pmsUserId);
            payload.put("event", "pre_signup");
            payload.put("email", email);
            payload.put("name", name);
            payload.put("role", role);
            payload.put("pmsUserId", pmsUserId);
            payload.put("group", role);
            payload.put("ts", ts);
            payload.put("sig", sig);
            payload.put("source", source);
            payload.put("userPoolId", userPoolId);
            payload.put("correlationId", correlationId);

            // Lambda handler expects an API Gateway-style event with a JSON string body.
            Map<String, Object> eventPayload = new HashMap<>();
            eventPayload.put("body", OBJECT_MAPPER.writeValueAsString(payload));
            String jsonPayload = OBJECT_MAPPER.writeValueAsString(eventPayload);

            InvokeResponse response = lambdaClient.invoke(InvokeRequest.builder()
                .functionName(lambdaAuthArn)
                .payload(SdkBytes.fromUtf8String(jsonPayload))
                .build());

            int statusCode = response.statusCode() != null ? response.statusCode() : 0;
            String functionError = response.functionError();
            String lambdaPayload = response.payload() != null ? response.payload().asUtf8String() : "";
            String lambdaRequestId = response.responseMetadata() != null ? response.responseMetadata().requestId() : null;

            if (statusCode < 200 || statusCode >= 300 || functionError != null) {
                throw new RuntimeException("Lambda pre-registration failed. status=" + statusCode
                    + ", functionError=" + functionError + ", payload=" + lambdaPayload);
            }

            Map<String, Object> normalizedPayload = normalizeLambdaPayload(lambdaPayload);
            Object success = normalizedPayload.get("success");
            if (success instanceof Boolean && !((Boolean) success)) {
                throw new RuntimeException("Lambda pre-registration returned success=false. payload=" + lambdaPayload);
            }

            String cognitoSub = firstNonBlank(
                asString(normalizedPayload.get("cognitoSub")),
                asString(normalizedPayload.get("userSub")),
                asString(normalizedPayload.get("sub"))
            );

            String cognitoUsername = firstNonBlank(
                asString(normalizedPayload.get("cognitoUsername")),
                asString(normalizedPayload.get("username")),
                asString(normalizedPayload.get("email"))
            );

            log.info("[corrId={}] Lambda pre-registration completed: pmsUserId={}, email={}, lambdaRequestId={}",
                correlationId, pmsUserId, email, lambdaRequestId);
            return new LambdaProvisioningResult(lambdaRequestId, cognitoSub, cognitoUsername);
        } catch (Exception e) {
            log.error("[corrId={}] Failed to invoke Lambda pre-registration for pmsUserId={}", correlationId, pmsUserId, e);
            String reason = e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
            throw new RuntimeException("Failed to invoke Lambda pre-registration: " + reason, e);
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> normalizeLambdaPayload(String lambdaPayload) throws Exception {
        if (lambdaPayload == null || lambdaPayload.isBlank()) {
            return new HashMap<>();
        }

        Map<String, Object> outer = OBJECT_MAPPER.readValue(lambdaPayload, Map.class);

        Object proxyStatusCode = outer.get("statusCode");
        if (proxyStatusCode instanceof Number && ((Number) proxyStatusCode).intValue() >= 400) {
            throw new RuntimeException("Lambda proxy response returned error statusCode="
                + ((Number) proxyStatusCode).intValue() + ", payload=" + lambdaPayload);
        }

        Object body = outer.get("body");
        if (body instanceof String bodyString && !bodyString.isBlank()) {
            try {
                return OBJECT_MAPPER.readValue(bodyString, Map.class);
            } catch (Exception ignored) {
                return outer;
            }
        }

        return outer;
    }

    private String asString(Object value) {
        return value == null ? null : Objects.toString(value, null);
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }

    private String resolveCognitoSubFallback(String primaryUsername, String email, String pmsUserId, String correlationId) {
        String[] candidates = new String[] {
            primaryUsername,
            cognitoService.resolveCognitoUsername(pmsUserId, email),
            email
        };

        for (String candidate : candidates) {
            if (candidate == null || candidate.isBlank()) {
                continue;
            }

            try {
                String sub = cognitoService.getRequiredUserSub(candidate);
                if (sub != null && !sub.isBlank()) {
                    log.info("[corrId={}] Resolved Cognito sub via fallback lookup using username={} ", correlationId, candidate);
                    return sub;
                }
            } catch (Exception ex) {
                log.debug("[corrId={}] Fallback Cognito sub lookup failed for username={}: {}",
                    correlationId,
                    candidate,
                    ex.getMessage());
            }
        }

        return null;
    }

    public record ProvisioningResult(
        String cognitoUsername,
        String cognitoSub,
        boolean lambdaInvoked,
        String correlationId,
        String lambdaRequestId
    ) {
    }

    private record LambdaProvisioningResult(
        String lambdaRequestId,
        String cognitoSub,
        String cognitoUsername
    ) {
    }
}
