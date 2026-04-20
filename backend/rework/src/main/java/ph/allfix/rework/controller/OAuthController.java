package ph.allfix.rework.controller;

import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import ph.allfix.rework.service.*;
import ph.allfix.rework.util.CryptoUtils;

import java.util.Map;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * OAuth2/SSO Controller
 * Handles PMS → Allfix SSO flow through Cognito
 */
@Slf4j
@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class OAuthController {

    @Autowired
    private PMSUserService pmsUserService;

    @Autowired
    private CognitoService cognitoService;

    @Autowired
    private AuthProvisioningService authProvisioningService;

    @Value("${cognito.domain}")
    private String cognitoDomain;

    @Value("${cognito.client-id}")
    private String clientId;

    @Value("${cognito.scope:openid,email}")
    private String cognitoScope;

    @Value("${app.cognito-redirect-uri}")
    private String redirectUri;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Value("${pms.trusted-sso-secret}")
    private String trustedSsoSecret;

    /**
    * PMS Trusted Handoff Endpoint
    * Receives signed payload from PMS, verifies signature, prepares user, and redirects to Cognito authorize flow.
     * Flow: PMS sends uid+mode+name+iat+exp+nonce with HMAC-SHA256 signature
     */
    @GetMapping("/pms-trusted-entry")
    public RedirectView pmsTrustedEntry(
            @RequestParam String uid,
            @RequestParam String mode,
            @RequestParam String name,
            @RequestParam long iat,
            @RequestParam long exp,
            @RequestParam String nonce,
            @RequestParam String sig) {

        try {
            log.info("PMS trusted handoff received: uid={}, mode={}, name={}", uid, mode, name);

            // Validate signature (supports common encoding variants for the name field)
            if (!isValidTrustedSignature(uid, mode, name, iat, exp, nonce, sig)) {
                log.warn("Invalid HMAC signature for PMS handoff: uid={}, name={}", uid, name);
                return new RedirectView(frontendUrl + "/login?error=invalid_signature");
            }

            // Validate timestamp (token must not be expired)
            long now = System.currentTimeMillis() / 1000;
            if (exp < now) {
                log.warn("PMS token expired: uid={}, exp={}, now={}", uid, exp, now);
                return new RedirectView(frontendUrl + "/login?error=token_expired");
            }

            // Verify PMS user exists
            if (!pmsUserService.userExists(uid)) {
                log.warn("PMS user not found: uid={}", uid);
                return new RedirectView(frontendUrl + "/login?error=user_not_found");
            }

            // Get PMS user email, or fall back to a synthetic Cognito email if PMS does not provide one.
            String email = cognitoService.resolveProvisioningEmail(pmsUserService.getUserEmail(uid), uid);

            log.info("PMS user validated: uid={}, email={}, mode={}", uid, email, mode);

            String cognitoGroup = mapPmsModeToGroup(mode);
            AuthProvisioningService.ProvisioningResult provisioningResult =
                authProvisioningService.provisionPmsUser(email, uid, cognitoGroup, "pms_trusted_handoff", name);
            CognitoService.AdminAuthTokens authTokens = null;
            try {
                authTokens = cognitoService.issueAdminAuthTokens(provisioningResult.cognitoUsername(), uid, name);
            } catch (Exception tokenEx) {
                log.warn("[corrId={}] Unable to mint Cognito admin tokens; continuing with tokenless bridge fallback. cause={}",
                    provisioningResult.correlationId(), tokenEx.getMessage());
            }

            log.info("[corrId={}] PMS handoff validated; preparing frontend bridge state, lambdaRequestId={}",
                provisioningResult.correlationId(), provisioningResult.lambdaRequestId());

            String state = buildPmsState(
                cognitoGroup,
                mapGroupToFrontendRoute(cognitoGroup),
                provisioningResult.correlationId(),
                "pms_trusted_handoff"
            );

            log.info("[corrId={}] PMS handoff validated; redirecting to frontend Cognito session bridge", provisioningResult.correlationId());
            return new RedirectView(buildFrontendBridgeUrl(
                email,
                cognitoGroup,
                provisioningResult.cognitoUsername(),
                provisioningResult.correlationId(),
                "pms_trusted_handoff",
                state,
                authTokens
            ));
        } catch (Exception e) {
            String errorMsg = e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName();
            log.error("Error in PMS trusted handoff: {}", errorMsg, e);
            // For debugging: include exception type in error response
            String errorCode = "pms_handoff_failed";
            if (errorMsg.contains("Cognito") || errorMsg.contains("AWS")) {
                errorCode = "pms_cognito_error";
            } else if (errorMsg.contains("PMS")) {
                errorCode = "pms_validation_error";
            }
            String encodedDetail = URLEncoder.encode(errorMsg, StandardCharsets.UTF_8);
            return new RedirectView(frontendUrl + "/login?error=" + errorCode + "&detail=" + encodedDetail);
        }
    }

    /**
     * Map PMS account mode to Cognito group
     */
    private String mapPmsModeToGroup(String mode) {
        if (mode == null) return "customers";
        
        switch (mode.toLowerCase()) {
            case "admin":
                return "admins";
            case "personnel":
            case "staff":
                return "personnel";
            case "vendor":
                return "vendors";
            case "user":
            case "customer":
                return "customers";
            default:
                return "customers";
        }
    }

    private boolean isValidTrustedSignature(
            String uid,
            String mode,
            String name,
            long iat,
            long exp,
            String nonce,
            String sig) {

        if (sig == null || sig.isBlank()) {
            return false;
        }

        String normalizedSig = sig.trim().toLowerCase();
        Set<String> nameCandidates = new LinkedHashSet<>();
        nameCandidates.add(name);
        nameCandidates.add(name.replace(" ", "+"));
        nameCandidates.add(name.replace(" ", "%20"));
        nameCandidates.add(URLEncoder.encode(name, StandardCharsets.UTF_8));

        for (String candidateName : nameCandidates) {
            String payload = "uid=" + uid + "&mode=" + mode + "&name=" + candidateName
                + "&iat=" + iat + "&exp=" + exp + "&nonce=" + nonce;
            String expectedSig = CryptoUtils.generateHMACHex(payload, trustedSsoSecret);
            if (normalizedSig.equals(expectedSig.toLowerCase())) {
                return true;
            }
        }

        return false;
    }

    /**
     * Initiate SSO flow from PMS
     * Validates PMS user and redirects to Cognito authorize endpoint
     */
    @GetMapping("/initiate-sso")
        public RedirectView initiateSso(
            @RequestParam String user_id,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Long timestamp,
            @RequestParam(required = false) String signature) {

        try {
            String effectiveEmail = cognitoService.resolveProvisioningEmail(email, user_id);
            log.info("SSO flow initiated: userId={}, email={}, effectiveEmail={}", user_id, email, effectiveEmail);

            // Validate PMS user
            if (timestamp == null) {
                timestamp = System.currentTimeMillis() / 1000;
            }
            
            if (signature == null) {
                signature = CryptoUtils.generateHMAC(user_id + timestamp, "dev-secret-key");
            }

            if (!pmsUserService.validatePMSUser(user_id, timestamp, signature)) {
                log.warn("PMS user validation failed: userId={}", user_id);
                return new RedirectView(frontendUrl + "/login?error=invalid_pms_session");
            }

            // Verify PMS user exists
            if (!pmsUserService.userExists(user_id)) {
                log.warn("PMS user not found: userId={}", user_id);
                return new RedirectView(frontendUrl + "/login?error=user_not_found");
            }

            // Get/Create Cognito user
            String pmsRole = pmsUserService.getUserRole(user_id);
            String cognitoGroup = CognitoService.mapRoleToCognitoGroup(pmsRole);
            AuthProvisioningService.ProvisioningResult provisioningResult =
                authProvisioningService.provisionPmsUser(effectiveEmail, user_id, cognitoGroup, "pms_sso");
            CognitoService.AdminAuthTokens authTokens = null;
            try {
                authTokens = cognitoService.issueAdminAuthTokens(provisioningResult.cognitoUsername(), user_id);
            } catch (Exception tokenEx) {
                log.warn("[corrId={}] Unable to mint Cognito admin tokens; continuing with tokenless bridge fallback. cause={}",
                    provisioningResult.correlationId(), tokenEx.getMessage());
            }

            log.info("[corrId={}] Cognito user ready: username={}, group={}, lambdaInvoked={}, lambdaRequestId={}",
                provisioningResult.correlationId(),
                provisioningResult.cognitoUsername(),
                cognitoGroup,
                provisioningResult.lambdaInvoked(),
                provisioningResult.lambdaRequestId());

            String state = buildPmsState(
                cognitoGroup,
                mapGroupToFrontendRoute(cognitoGroup),
                provisioningResult.correlationId(),
                "pms_sso"
            );

            log.info("[corrId={}] PMS initiate-sso validated; redirecting to frontend Cognito session bridge", provisioningResult.correlationId());
            return new RedirectView(buildFrontendBridgeUrl(
                effectiveEmail,
                cognitoGroup,
                provisioningResult.cognitoUsername(),
                provisioningResult.correlationId(),
                "pms_sso",
                state,
                authTokens
            ));
        } catch (Exception e) {
            log.error("Error in SSO initiation", e);
            return new RedirectView(frontendUrl + "/login?error=sso_failed");
        }
    }

    /**
     * Legacy backend callback endpoint.
     * In code+PKCE browser flow, Cognito should redirect to frontend /auth/callback directly.
     * This endpoint keeps backward compatibility by forwarding query params to frontend callback.
     */
    @GetMapping("/login/oauth2/code/cognito")
    public RedirectView cognitoCallback(HttpServletRequest request) {
        String error = request.getParameter("error");
        String state = request.getParameter("state");

        // Silent SSO uses prompt=none and can return login_required when no browser session exists.
        // In that case, return to frontend login instead of Cognito managed /login,
        // which can be disabled for this app client and produce "Login pages unavailable".
        if ("login_required".equals(error) || "interaction_required".equals(error)) {
            String fallback = frontendUrl + resolveLoginRouteFromState(state) + "?error=cognito_login_required&source=pms_sso";
            if (state != null && !state.isBlank()) {
                fallback = fallback + "&state=" + URLEncoder.encode(state, StandardCharsets.UTF_8);
            }
            log.warn("Silent SSO returned {}; redirecting to frontend login fallback", error);
            return new RedirectView(fallback);
        }

        String query = request.getQueryString();
        String redirectUrl = frontendUrl + "/auth/callback" + (query == null || query.isBlank() ? "" : "?" + query);
        log.info("Legacy backend callback hit; forwarding to frontend callback route");
        return new RedirectView(redirectUrl);
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "allfix-oauth2"
        ));
    }

    /**
     * Bridge endpoint used by frontend /auth/pms-trusted route:
     * validates Cognito tokens, writes secure HttpOnly cookies and session state, and returns dashboard route.
     */
    @PostMapping("/bridge/session")
    public ResponseEntity<Map<String, Object>> establishBridgeSession(
            @RequestBody BridgeSessionRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse response,
            HttpSession session) {

        if (request == null || request.accessToken() == null || request.accessToken().isBlank()
                || request.idToken() == null || request.idToken().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                "ok", false,
                "error", "missing_tokens"
            ));
        }

        try {
            CognitoService.ValidatedAccessToken validated = cognitoService.validateAccessToken(request.accessToken());
            String nextRoute = mapGroupToFrontendRoute(request.group());

            setTokenCookie(response, "allfix_at", request.accessToken(), 3600, httpRequest.isSecure());
            setTokenCookie(response, "allfix_it", request.idToken(), 3600, httpRequest.isSecure());

            if (request.refreshToken() != null && !request.refreshToken().isBlank()) {
                setTokenCookie(response, "allfix_rt", request.refreshToken(), 60 * 60 * 24 * 30, httpRequest.isSecure());
            }

            session.setAttribute("allfixBridgeAuthenticated", Boolean.TRUE);
            session.setAttribute("allfixBridgeUsername", validated.username());
            session.setAttribute("allfixBridgeSub", validated.sub());
            session.setAttribute("allfixBridgeGroup", request.group());
            session.setAttribute("allfixBridgeNext", nextRoute);

            return ResponseEntity.ok(Map.of(
                "ok", true,
                "username", validated.username(),
                "next", nextRoute
            ));
        } catch (Exception ex) {
            log.warn("Bridge session token validation failed: {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "ok", false,
                "error", "invalid_tokens"
            ));
        }
    }

    /**
     * Build Cognito authorization URL
     */
    private String buildCognitoAuthUrl(String email, String state) {
        String scopeParam = buildScopeParam(cognitoScope);
        return String.format(
            "https://%s/oauth2/authorize?client_id=%s&response_type=code&scope=%s" +
            "&redirect_uri=%s&state=%s&login_hint=%s&prompt=none",
            cognitoDomain,
            clientId,
            scopeParam,
            java.net.URLEncoder.encode(redirectUri, java.nio.charset.StandardCharsets.UTF_8),
            state,
            email
        );
    }

    private String buildScopeParam(String configuredScope) {
        String fallback = "openid";
        if (configuredScope == null || configuredScope.isBlank()) {
            return URLEncoder.encode(fallback, StandardCharsets.UTF_8);
        }

        String normalized = configuredScope.trim().replace('+', ' ').replace(',', ' ');
        String scope = Arrays.stream(normalized.split("\\s+"))
            .filter(token -> !token.isBlank())
            .distinct()
            .collect(Collectors.joining(" "));

        if (scope.isBlank()) {
            scope = fallback;
        }

        return URLEncoder.encode(scope, StandardCharsets.UTF_8);
    }

    private String buildPmsState(String group, String nextRoute, String correlationId, String source) {
        String payload = "group=" + urlEncodeSafe(group)
            + "&next=" + urlEncodeSafe(nextRoute)
            + "&corrId=" + urlEncodeSafe(correlationId)
            + "&source=" + urlEncodeSafe(source);

        return Base64.getUrlEncoder()
            .withoutPadding()
            .encodeToString(payload.getBytes(StandardCharsets.UTF_8));
    }

    private String resolveLoginRouteFromState(String state) {
        String defaultRoute = "/login";
        if (state == null || state.isBlank()) {
            return defaultRoute;
        }

        try {
            String decoded = new String(Base64.getUrlDecoder().decode(state), StandardCharsets.UTF_8);
            for (String pair : decoded.split("&")) {
                String[] parts = pair.split("=", 2);
                if (parts.length == 2 && "group".equals(parts[0])) {
                    String group = java.net.URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
                    return switch (group.toLowerCase()) {
                        case "admins" -> "/admin-login";
                        case "personnel" -> "/personnel-login";
                        case "vendors" -> "/vendor-login";
                        default -> "/login";
                    };
                }
            }
        } catch (Exception ex) {
            log.debug("Unable to decode OAuth state for login fallback route", ex);
        }

        return defaultRoute;
    }

    private String urlEncodeSafe(String value) {
        return URLEncoder.encode(value == null ? "" : value, StandardCharsets.UTF_8);
    }

    private String mapGroupToFrontendRoute(String group) {
        if (group == null || group.isBlank()) {
            return "/user";
        }

        return switch (group.toLowerCase()) {
            case "admins" -> "/admin";
            case "personnel" -> "/personnel";
            case "vendors" -> "/vendor";
            default -> "/user";
        };
    }

    private String buildFrontendBridgeUrl(
            String email,
            String group,
            String username,
            String correlationId,
            String source,
            String state,
            CognitoService.AdminAuthTokens authTokens) {
        String route = mapGroupToFrontendRoute(group);
        StringBuilder url = new StringBuilder(frontendUrl)
            .append("/auth/pms-trusted")
            .append("?next=").append(URLEncoder.encode(route, StandardCharsets.UTF_8))
            .append("&group=").append(URLEncoder.encode(group == null ? "" : group, StandardCharsets.UTF_8))
            .append("&email=").append(URLEncoder.encode(email == null ? "" : email, StandardCharsets.UTF_8))
            .append("&username=").append(URLEncoder.encode(username == null ? "" : username, StandardCharsets.UTF_8))
            .append("&source=").append(URLEncoder.encode(source == null ? "" : source, StandardCharsets.UTF_8));

        if (authTokens != null) {
            url.append("&at=").append(URLEncoder.encode(authTokens.accessToken() == null ? "" : authTokens.accessToken(), StandardCharsets.UTF_8));
            url.append("&it=").append(URLEncoder.encode(authTokens.idToken() == null ? "" : authTokens.idToken(), StandardCharsets.UTF_8));
            if (authTokens.refreshToken() != null && !authTokens.refreshToken().isBlank()) {
                url.append("&rt=").append(URLEncoder.encode(authTokens.refreshToken(), StandardCharsets.UTF_8));
            }
        }

        if (correlationId != null && !correlationId.isBlank()) {
            url.append("&corrId=").append(URLEncoder.encode(correlationId, StandardCharsets.UTF_8));
        }
        if (state != null && !state.isBlank()) {
            url.append("&state=").append(URLEncoder.encode(state, StandardCharsets.UTF_8));
        }
        return url.toString();
    }

    private void setTokenCookie(HttpServletResponse response, String name, String value, long maxAgeSeconds, boolean secure) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
            .httpOnly(true)
            .secure(secure)
            .path("/")
            .sameSite("Lax")
            .maxAge(maxAgeSeconds)
            .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public record BridgeSessionRequest(
        String accessToken,
        String idToken,
        String refreshToken,
        String group
    ) {}

}
