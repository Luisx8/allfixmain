package ph.allfix.rework.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminAddUserToGroupRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminCreateUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminGetUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminGetUserResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminListGroupsForUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminListGroupsForUserResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminSetUserPasswordRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminUpdateUserAttributesRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthFlowType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthenticationResultType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ChallengeNameType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CognitoIdentityProviderException;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CreateGroupRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GroupType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ListGroupsRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ListGroupsResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ListUsersRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.ListUsersResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.MessageActionType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.UserType;
import software.amazon.awssdk.awscore.exception.AwsServiceException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Cognito service for user management and group operations.
 * PMS users are created in the Cognito user pool and assigned to the proper group.
 */
@Slf4j
@Service
public class CognitoService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    @Autowired
    private CognitoIdentityProviderClient cognitoClient;

    @Value("${cognito.user-pool-id}")
    private String userPoolId;

    @Value("${pms.auto-verify-email:true}")
    private boolean autoVerifyEmail;

    @Value("${cognito.pms-custom-attribute-name:}")
    private String pmsCustomAttributeName;

    @Value("${cognito.dummy-email-domain:allfix.internal}")
    private String dummyEmailDomain;

    @Value("${cognito.client-id}")
    private String clientId;

    @Value("${cognito.client-secret:}")
    private String clientSecret;

    @Value("${cognito.admin-auth-password-secret:${pms.backend-secret:dev-secret-key}}")
    private String adminAuthPasswordSecret;

    /**
     * Get or create user in Cognito.
     *
     * @param email     User email
     * @param pmsUserId PMS user ID for custom attribute
     * @return Username (email)
     */
    public String getOrCreateUser(String email, String pmsUserId) {
        return getOrCreateUser(email, pmsUserId, null);
    }

    public String getOrCreateUser(String email, String pmsUserId, String displayName) {
        try {
            String effectiveEmail = resolveProvisioningEmail(email, pmsUserId);
            String cognitoUsername = resolveCognitoUsername(pmsUserId, email);

            log.info("Getting or creating Cognito user: email={}, effectiveEmail={}, cognitoUsername={}, pmsUserId={}, userPoolId={}",
                email, effectiveEmail, cognitoUsername, pmsUserId, userPoolId);

            String existingUsername = findExistingUsername(cognitoUsername, effectiveEmail, pmsUserId);
            if (existingUsername != null) {
                updateUserAttributes(existingUsername, effectiveEmail, pmsUserId, displayName);
                log.info("Cognito user already exists and was updated: {}", existingUsername);
                return existingUsername;
            }

            cognitoClient.adminCreateUser(AdminCreateUserRequest.builder()
                .userPoolId(userPoolId)
                .username(cognitoUsername)
                .temporaryPassword(generateTemporaryPassword())
                .messageAction(MessageActionType.SUPPRESS)
                .userAttributes(buildUserAttributes(effectiveEmail, pmsUserId, displayName))
                .build());

            log.info("Cognito user created in user pool: username={}, effectiveEmail={}", cognitoUsername, effectiveEmail);
            return cognitoUsername;
        } catch (CognitoIdentityProviderException ex) {
            String errorCode = ex.awsErrorDetails() != null ? ex.awsErrorDetails().errorCode() : null;
            String errorMessage = ex.awsErrorDetails() != null ? ex.awsErrorDetails().errorMessage() : ex.getMessage();

            if ("UsernameExistsException".equals(errorCode) || "AliasExistsException".equals(errorCode)) {
                String resolvedEmail = resolveProvisioningEmail(email, pmsUserId);
                String resolvedUsername = resolveCognitoUsername(pmsUserId, email);
                String existingUsername = findExistingUsername(resolvedUsername, resolvedEmail, pmsUserId);
                if (existingUsername != null) {
                    updateUserAttributes(existingUsername, resolvedEmail, pmsUserId, displayName);
                    log.info("Cognito user resolved after alias conflict: {}", existingUsername);
                    return existingUsername;
                }
            }

            log.error("Error getting/creating Cognito user: code={}, message={}", errorCode, errorMessage, ex);
            throw new RuntimeException("Failed to get or create Cognito user: " + errorCode + " - " + errorMessage, ex);
        } catch (Exception e) {
            log.error("Error getting/creating Cognito user", e);
            throw new RuntimeException("Failed to get or create Cognito user", e);
        }
    }

    /**
     * Add user to Cognito group.
     *
     * @param username User email
     * @param group    Group name (e.g., "customers", "vendors", "personnel", "admins")
     */
    public void addUserToGroup(String username, String group) {
        try {
            String normalizedGroup = normalizeGroup(group);
            ensureGroupExists(normalizedGroup);

            log.info("Adding user to Cognito group: username={}, group={}, userPoolId={}", username, normalizedGroup, userPoolId);
            cognitoClient.adminAddUserToGroup(AdminAddUserToGroupRequest.builder()
                .userPoolId(userPoolId)
                .username(username)
                .groupName(normalizedGroup)
                .build());

            log.info("User added to Cognito group: username={}, group={}", username, normalizedGroup);
        } catch (Exception e) {
            log.error("Error adding user to group", e);
            throw new RuntimeException("Failed to add user to Cognito group", e);
        }
    }

    /**
     * Get user groups.
     *
     * @param username User email
     * @return List of group names
     */
    public List<String> getUserGroups(String username) {
        try {
            log.debug("Retrieving groups for user: username={}, userPoolId={}", username, userPoolId);

            AdminListGroupsForUserResponse response = cognitoClient.adminListGroupsForUser(
                AdminListGroupsForUserRequest.builder()
                    .userPoolId(userPoolId)
                    .username(username)
                    .build()
            );

            List<String> groups = new ArrayList<>();
            if (response.groups() != null) {
                for (GroupType group : response.groups()) {
                    if (group.groupName() != null) {
                        groups.add(group.groupName());
                    }
                }
            }

            log.debug("Retrieved groups for user: username={}, groups={}", username, groups);
            return groups;
        } catch (Exception e) {
            log.error("Error retrieving user groups", e);
            return new ArrayList<>();
        }
    }

    /**
     * Map PMS role to Cognito group.
     *
     * @param pmsRole PMS role (admin, personnel, vendor, customer)
     * @return Cognito group name
     */
    public static String mapRoleToCognitoGroup(String pmsRole) {
        if (pmsRole == null || pmsRole.isBlank()) {
            return "customers";
        }

        return switch (pmsRole.toLowerCase()) {
            case "admin" -> "admins";
            case "personnel" -> "personnel";
            case "vendor" -> "vendors";
            case "customer" -> "customers";
            default -> "customers";
        };
    }

    /**
     * Resolve Cognito Subject ID (sub) for a username.
     *
     * @param username Cognito username
     * @return Cognito sub attribute value
     */
    public String getRequiredUserSub(String username) {
        try {
            AdminGetUserResponse response = cognitoClient.adminGetUser(AdminGetUserRequest.builder()
                .userPoolId(userPoolId)
                .username(username)
                .build());

            Optional<String> sub = response.userAttributes().stream()
                .filter(attribute -> "sub".equals(attribute.name()))
                .map(AttributeType::value)
                .filter(value -> value != null && !value.isBlank())
                .findFirst();

            if (sub.isPresent()) {
                return sub.get();
            }

            throw new RuntimeException("Cognito user is missing required sub attribute");
        } catch (Exception e) {
            log.error("Failed to resolve Cognito sub for username={}", username, e);
            throw new RuntimeException("Failed to resolve Cognito sub", e);
        }
    }

    /**
     * Ensures a deterministic permanent password exists for the user and issues Cognito tokens using
     * ADMIN_USER_PASSWORD_AUTH. This produces real Cognito tokens without Hosted UI interaction.
     */
    public AdminAuthTokens issueAdminAuthTokens(String username, String pmsUserId) {
        return issueAdminAuthTokens(username, pmsUserId, null);
    }

    public AdminAuthTokens issueAdminAuthTokens(String username, String pmsUserId, String displayName) {
        String effectivePmsIdentifier = (pmsUserId == null || pmsUserId.isBlank()) ? username : pmsUserId;
        String cognitoUsername = resolveCognitoUsername(effectivePmsIdentifier, username);
        String fallbackLookupEmail = resolveProvisioningEmail(null, effectivePmsIdentifier);
        String emailCompatibleUsername = resolveEmailCompatibleUsername(username, fallbackLookupEmail);
        String authPassword = generateTemporaryPassword();

        try {
            String existingUsername = findExistingUsernameForAdminAuth(cognitoUsername, username, fallbackLookupEmail, emailCompatibleUsername);
            boolean userCreated = false;

            if (existingUsername == null) {
                String createEmail = resolveProvisioningEmail(null, effectivePmsIdentifier);
                List<AttributeType> bootstrapAttributes = buildAdminAuthBootstrapAttributes(createEmail, effectivePmsIdentifier, displayName);
                String usernameForCreate = resolveEmailCompatibleUsername(cognitoUsername, createEmail);

                cognitoClient.adminCreateUser(AdminCreateUserRequest.builder()
                    .userPoolId(userPoolId)
                    .username(usernameForCreate)
                    .temporaryPassword(authPassword)
                    .messageAction(MessageActionType.SUPPRESS)
                    .userAttributes(bootstrapAttributes)
                    .build());

                userCreated = true;
                existingUsername = usernameForCreate;
                log.info("Created Cognito user for admin auth bootstrap: username={}, email={}", existingUsername, createEmail);
            } else {
                updateUserAttributes(existingUsername, fallbackLookupEmail, effectivePmsIdentifier, displayName);
            }

            cognitoClient.adminSetUserPassword(AdminSetUserPasswordRequest.builder()
                .userPoolId(userPoolId)
                .username(existingUsername)
                .password(authPassword)
                .permanent(true)
                .build());

            log.info("Set permanent admin auth password for username={}, createdNow={}", existingUsername, userCreated);
            return initiateAdminPasswordAuth(existingUsername, authPassword);
        } catch (CognitoIdentityProviderException e) {
            String code = awsErrorCode(e);
            String message = awsErrorMessage(e);
            log.error("Failed to issue admin auth tokens for username={}, code={}, message={}", emailCompatibleUsername, code, message, e);
            throw new RuntimeException("Failed to issue Cognito admin auth tokens: " + code + " - " + message, e);
        } catch (AwsServiceException e) {
            log.error("Failed to issue admin auth tokens for username={} due to AWS service error", emailCompatibleUsername, e);
            throw new RuntimeException("Failed to issue Cognito admin auth tokens: " + e.awsErrorDetails().errorCode()
                + " - " + e.awsErrorDetails().errorMessage(), e);
        } catch (Exception e) {
            log.error("Failed to issue admin auth tokens for username={}", emailCompatibleUsername, e);
            throw new RuntimeException("Failed to issue Cognito admin auth tokens", e);
        }
    }

    private String findExistingUsernameForAdminAuth(String cognitoUsername, String providedIdentifier, String fallbackLookupEmail,
                                                    String emailCompatibleUsername) {
        List<String> lookupCandidates = new ArrayList<>();
        addLookupCandidate(lookupCandidates, cognitoUsername);
        addLookupCandidate(lookupCandidates, providedIdentifier);
        addLookupCandidate(lookupCandidates, fallbackLookupEmail);
        addLookupCandidate(lookupCandidates, emailCompatibleUsername);

        for (String candidate : lookupCandidates) {
            try {
                cognitoClient.adminGetUser(AdminGetUserRequest.builder()
                    .userPoolId(userPoolId)
                    .username(candidate)
                    .build());
                return candidate;
            } catch (CognitoIdentityProviderException ex) {
                String errorCode = awsErrorCode(ex);
                if (!"UserNotFoundException".equals(errorCode)) {
                    if (isEmailUsernameConstraintError(ex)) {
                        log.debug("Skipping admin auth lookup candidate due to email-username constraint: {}", candidate);
                        continue;
                    }
                    throw ex;
                }
            }
        }

        return null;
    }

    private String resolveEmailCompatibleUsername(String primary, String fallbackEmail) {
        if (isEmailLike(primary)) {
            return primary.trim().toLowerCase();
        }

        return fallbackEmail;
    }

    private boolean isEmailLike(String value) {
        if (value == null || value.isBlank()) {
            return false;
        }

        String candidate = value.trim();
        int atIndex = candidate.indexOf('@');
        return atIndex > 0 && atIndex < candidate.length() - 1;
    }

    private boolean isEmailUsernameConstraintError(CognitoIdentityProviderException ex) {
        String code = awsErrorCode(ex);
        String message = awsErrorMessage(ex);
        return "InvalidParameterException".equals(code)
            && message != null
            && message.toLowerCase().contains("username should be an email");
    }

    private void addLookupCandidate(List<String> candidates, String rawValue) {
        if (rawValue == null || rawValue.isBlank()) {
            return;
        }

        String normalized = rawValue.trim();
        if (!candidates.contains(normalized)) {
            candidates.add(normalized);
        }
    }

    private List<AttributeType> buildAdminAuthBootstrapAttributes(String email, String pmsUserId, String displayName) {
        List<AttributeType> attributes = new ArrayList<>();
        attributes.add(AttributeType.builder().name("email").value(email).build());
        attributes.add(AttributeType.builder().name("email_verified").value("true").build());
        String normalizedDisplayName = normalizeDisplayName(displayName);
        if (normalizedDisplayName != null) {
            attributes.add(AttributeType.builder().name("name").value(normalizedDisplayName).build());
        }

        if (pmsUserId != null && !pmsUserId.isBlank()) {
            attributes.add(AttributeType.builder().name("preferred_username").value(pmsUserId).build());
        }

        if (pmsCustomAttributeName != null && !pmsCustomAttributeName.isBlank() && pmsUserId != null && !pmsUserId.isBlank()) {
            attributes.add(AttributeType.builder().name(pmsCustomAttributeName).value(pmsUserId).build());
        }

        return attributes;
    }

    private AdminAuthTokens initiateAdminPasswordAuth(String username, String password) {
        Map<String, String> authParams = new HashMap<>();
        authParams.put("USERNAME", username);
        authParams.put("PASSWORD", password);
        String secretHash = computeSecretHash(username);
        if (secretHash != null) {
            authParams.put("SECRET_HASH", secretHash);
        }

        AdminInitiateAuthResponse authResponse = cognitoClient.adminInitiateAuth(AdminInitiateAuthRequest.builder()
            .userPoolId(userPoolId)
            .clientId(clientId)
            .authFlow(AuthFlowType.ADMIN_USER_PASSWORD_AUTH)
            .authParameters(authParams)
            .build());

        if (authResponse.challengeName() == ChallengeNameType.NEW_PASSWORD_REQUIRED) {
            throw new RuntimeException("Cognito returned NEW_PASSWORD_REQUIRED during admin auth; permanent password was not applied correctly");
        }

        AuthenticationResultType result = authResponse.authenticationResult();
        if (result == null || result.accessToken() == null || result.idToken() == null) {
            throw new RuntimeException("Cognito did not return authentication tokens; challenge=" + authResponse.challengeName());
        }

        return new AdminAuthTokens(
            result.accessToken(),
            result.idToken(),
            result.refreshToken(),
            result.expiresIn(),
            result.tokenType()
        );
    }

    private String awsErrorCode(CognitoIdentityProviderException ex) {
        if (ex == null || ex.awsErrorDetails() == null || ex.awsErrorDetails().errorCode() == null
            || ex.awsErrorDetails().errorCode().isBlank()) {
            return ex == null ? "Unknown" : ex.getClass().getSimpleName();
        }
        return ex.awsErrorDetails().errorCode();
    }

    private String awsErrorMessage(CognitoIdentityProviderException ex) {
        if (ex == null || ex.awsErrorDetails() == null || ex.awsErrorDetails().errorMessage() == null
            || ex.awsErrorDetails().errorMessage().isBlank()) {
            return ex == null ? "No message" : String.valueOf(ex.getMessage());
        }
        return ex.awsErrorDetails().errorMessage();
    }

    /**
     * Validates an access token by calling Cognito GetUser.
     */
    public ValidatedAccessToken validateAccessToken(String accessToken) {
        try {
            GetUserResponse response = cognitoClient.getUser(GetUserRequest.builder()
                .accessToken(accessToken)
                .build());

            String sub = response.userAttributes() == null ? null : response.userAttributes().stream()
                .filter(attribute -> "sub".equals(attribute.name()))
                .map(AttributeType::value)
                .filter(value -> value != null && !value.isBlank())
                .findFirst()
                .orElse(null);

            return new ValidatedAccessToken(response.username(), sub);
        } catch (Exception e) {
            log.warn("Access token validation failed", e);
            throw new RuntimeException("Invalid Cognito access token", e);
        }
    }

    private String findExistingUsername(String cognitoUsername, String email, String pmsUserId) {
        try {
            try {
                cognitoClient.adminGetUser(AdminGetUserRequest.builder()
                    .userPoolId(userPoolId)
                    .username(cognitoUsername)
                    .build());
                return cognitoUsername;
            } catch (CognitoIdentityProviderException ex) {
                String errorCode = ex.awsErrorDetails() != null ? ex.awsErrorDetails().errorCode() : null;
                if (!"UserNotFoundException".equals(errorCode)) {
                    throw ex;
                }
            }

            if (email != null && !email.isBlank()) {
                try {
                    // Legacy compatibility: some older users were created with email as username.
                    cognitoClient.adminGetUser(AdminGetUserRequest.builder()
                        .userPoolId(userPoolId)
                        .username(email)
                        .build());
                    return email;
                } catch (CognitoIdentityProviderException ex) {
                    String errorCode = ex.awsErrorDetails() != null ? ex.awsErrorDetails().errorCode() : null;
                    if (!"UserNotFoundException".equals(errorCode)) {
                        throw ex;
                    }
                }
            }

            UserType byEmail = findUserByFilter(String.format("email = \"%s\"", escapeFilterValue(email)));
            if (byEmail != null && byEmail.username() != null && !byEmail.username().isBlank()) {
                return byEmail.username();
            }

            UserType byPreferredUsername = findUserByFilter(String.format("preferred_username = \"%s\"", escapeFilterValue(pmsUserId)));
            if (byPreferredUsername != null && byPreferredUsername.username() != null && !byPreferredUsername.username().isBlank()) {
                return byPreferredUsername.username();
            }

            if (pmsCustomAttributeName != null && !pmsCustomAttributeName.isBlank()) {
                UserType byCustomAttribute = findUserByFilter(String.format("%s = \"%s\"", pmsCustomAttributeName, escapeFilterValue(pmsUserId)));
                if (byCustomAttribute != null && byCustomAttribute.username() != null && !byCustomAttribute.username().isBlank()) {
                    return byCustomAttribute.username();
                }
            }

            return null;
        } catch (CognitoIdentityProviderException ex) {
            log.error("Error searching for Cognito user", ex);
            throw ex;
        }
    }

    private UserType findUserByFilter(String filter) {
        ListUsersResponse response = cognitoClient.listUsers(ListUsersRequest.builder()
            .userPoolId(userPoolId)
            .filter(filter)
            .limit(1)
            .build());

        if (response.users() == null || response.users().isEmpty()) {
            return null;
        }

        return response.users().get(0);
    }

    private void updateUserAttributes(String username, String email, String pmsUserId, String displayName) {
        List<AttributeType> attributes = buildUserAttributes(email, pmsUserId, displayName);
        if (attributes.isEmpty()) {
            return;
        }

        cognitoClient.adminUpdateUserAttributes(AdminUpdateUserAttributesRequest.builder()
            .userPoolId(userPoolId)
            .username(username)
            .userAttributes(attributes)
            .build());
    }

    private List<AttributeType> buildUserAttributes(String email, String pmsUserId, String displayName) {
        List<AttributeType> attributes = new ArrayList<>();
        attributes.add(AttributeType.builder().name("email").value(email).build());
        attributes.add(AttributeType.builder().name("email_verified").value(Boolean.toString(autoVerifyEmail)).build());
        if (pmsUserId != null && !pmsUserId.isBlank()) {
            attributes.add(AttributeType.builder().name("preferred_username").value(pmsUserId).build());
        }

        String normalizedDisplayName = normalizeDisplayName(displayName);
        if (normalizedDisplayName != null) {
            attributes.add(AttributeType.builder().name("name").value(normalizedDisplayName).build());
        }

        if (pmsCustomAttributeName != null && !pmsCustomAttributeName.isBlank()) {
            attributes.add(AttributeType.builder().name(pmsCustomAttributeName).value(pmsUserId).build());
        }

        return attributes;
    }

    public void ensureProfileAttributes(String preferredUsername, String email, String pmsUserId, String displayName) {
        try {
            String effectiveEmail = resolveProvisioningEmail(email, pmsUserId);
            String resolvedUsername = findExistingUsername(
                resolveCognitoUsername(pmsUserId, email),
                effectiveEmail,
                pmsUserId
            );

            String targetUsername = (resolvedUsername != null && !resolvedUsername.isBlank())
                ? resolvedUsername
                : preferredUsername;

            if (targetUsername == null || targetUsername.isBlank()) {
                return;
            }

            updateUserAttributes(targetUsername, effectiveEmail, pmsUserId, displayName);
        } catch (Exception ex) {
            log.warn("Unable to sync Cognito profile attributes for username={}: {}", preferredUsername, ex.getMessage());
        }
    }

    private String normalizeDisplayName(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        String normalized = value.trim();
        if (normalized.length() <= 2048) {
            return normalized;
        }

        return normalized.substring(0, 2048);
    }

    private void ensureGroupExists(String groupName) {
        ListGroupsResponse response = cognitoClient.listGroups(ListGroupsRequest.builder()
            .userPoolId(userPoolId)
            .limit(60)
            .build());

        boolean exists = response.groups() != null && response.groups().stream()
            .map(GroupType::groupName)
            .anyMatch(groupName::equals);

        if (exists) {
            return;
        }

        cognitoClient.createGroup(CreateGroupRequest.builder()
            .userPoolId(userPoolId)
            .groupName(groupName)
            .build());
    }

    private String normalizeGroup(String group) {
        if (group == null || group.isBlank()) {
            return "customers";
        }

        return group.trim().toLowerCase();
    }

    private String escapeFilterValue(String value) {
        if (value == null) {
            return "";
        }

        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    public String resolveProvisioningEmail(String email, String pmsUserId) {
        if (email != null && !email.isBlank()) {
            return email.trim().toLowerCase();
        }

        String safeUserId = sanitizeEmailLocalPart(pmsUserId);
        String safeDomain = (dummyEmailDomain == null || dummyEmailDomain.isBlank()) ? "allfix.internal" : dummyEmailDomain.trim().toLowerCase();
        return safeUserId + "@" + safeDomain;
    }

    public String resolveCognitoUsername(String pmsUserId, String email) {
        if (pmsUserId != null && !pmsUserId.isBlank()) {
            return sanitizeCognitoUsername(pmsUserId);
        }

        if (email != null && !email.isBlank()) {
            String localPart = email.trim().toLowerCase();
            int atIndex = localPart.indexOf('@');
            if (atIndex > 0) {
                localPart = localPart.substring(0, atIndex);
            }
            return sanitizeCognitoUsername(localPart);
        }

        return "user-" + randomChar("abcdefghijklmnopqrstuvwxyz") + randomChar("abcdefghijklmnopqrstuvwxyz")
            + randomChar("0123456789") + randomChar("0123456789") + randomChar("0123456789") + randomChar("0123456789");
    }

    private String sanitizeEmailLocalPart(String value) {
        if (value == null || value.isBlank()) {
            return "user";
        }

        String sanitized = value.trim().toLowerCase().replaceAll("[^a-z0-9._-]", "-");
        sanitized = sanitized.replaceAll("-+", "-");
        sanitized = sanitized.replaceAll("^[-_.]+", "");
        sanitized = sanitized.replaceAll("[-_.]+$", "");
        return sanitized.isBlank() ? "user" : sanitized;
    }

    private String sanitizeCognitoUsername(String value) {
        if (value == null || value.isBlank()) {
            return "user";
        }

        String sanitized = value.trim().toLowerCase().replaceAll("[^a-z0-9._-]", "-");
        sanitized = sanitized.replaceAll("-+", "-");
        sanitized = sanitized.replaceAll("^[-_.]+", "");
        sanitized = sanitized.replaceAll("[-_.]+$", "");

        if (sanitized.isBlank()) {
            return "user";
        }

        if (sanitized.length() > 128) {
            return sanitized.substring(0, 128);
        }

        return sanitized;
    }

    private String generateTemporaryPassword() {
        String uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowercase = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String symbols = "!@#$%^&*()-_=+[]{}<>?";
        String all = uppercase + lowercase + digits + symbols;

        StringBuilder password = new StringBuilder();
        password.append(randomChar(uppercase));
        password.append(randomChar(lowercase));
        password.append(randomChar(digits));
        password.append(randomChar(symbols));

        for (int i = password.length(); i < 16; i++) {
            password.append(randomChar(all));
        }

        return shuffle(password.toString());
    }

    private char randomChar(String chars) {
        return chars.charAt(SECURE_RANDOM.nextInt(chars.length()));
    }

    private String shuffle(String input) {
        char[] chars = input.toCharArray();
        for (int i = chars.length - 1; i > 0; i--) {
            int j = SECURE_RANDOM.nextInt(i + 1);
            char tmp = chars[i];
            chars[i] = chars[j];
            chars[j] = tmp;
        }
        return new String(chars);
    }

    private String computeSecretHash(String username) {
        if (clientSecret == null || clientSecret.isBlank()) {
            return null;
        }

        try {
            String message = username + clientId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(clientSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(keySpec);
            byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Failed to compute Cognito SECRET_HASH", e);
        }
    }

    public record AdminAuthTokens(
        String accessToken,
        String idToken,
        String refreshToken,
        Integer expiresIn,
        String tokenType
    ) {}

    public record ValidatedAccessToken(
        String username,
        String sub
    ) {}
}

