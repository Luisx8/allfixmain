package ph.allfix.rework.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Service for exchanging Cognito authorization code for tokens
 */
@Slf4j
@Service
public class CognitoTokenService {

    @Value("${cognito.domain}")
    private String cognitoDomain;

    @Value("${cognito.client-id}")
    private String clientId;

    @Value("${cognito.client-secret}")
    private String clientSecret;

    @Value("${app.cognito-redirect-uri}")
    private String redirectUri;

    private static final HttpClient httpClient = HttpClient.newBuilder().build();
    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Exchange authorization code for tokens
     *
     * @param code Authorization code from Cognito
     * @return TokenResponse containing access_token, id_token, refresh_token
     */
    public TokenResponse exchangeCodeForTokens(String code) {
        try {
            String tokenUrl = "https://" + cognitoDomain + "/oauth2/token";

            // Build the request body
            Map<String, String> params = new HashMap<>();
            params.put("grant_type", "authorization_code");
            params.put("code", code);
            params.put("client_id", clientId);
            params.put("client_secret", clientSecret);
            params.put("redirect_uri", redirectUri);

            // Create request
            String bodyString = buildFormUrlEncoded(params);
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(tokenUrl))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(bodyString))
                .build();

            // Send request
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Cognito token exchange failed: status={}, body={}", response.statusCode(), response.body());
                throw new RuntimeException("Failed to exchange code for tokens: " + response.body());
            }

            // Parse response
            @SuppressWarnings("unchecked")
            Map<String, Object> tokenMap = objectMapper.readValue(response.body(), Map.class);
            
            TokenResponse tokenResponse = new TokenResponse();
            tokenResponse.setAccessToken((String) tokenMap.get("access_token"));
            tokenResponse.setIdToken((String) tokenMap.get("id_token"));
            tokenResponse.setRefreshToken((String) tokenMap.get("refresh_token"));
            tokenResponse.setExpiresIn((Integer) tokenMap.get("expires_in"));
            tokenResponse.setTokenType((String) tokenMap.get("token_type"));

            log.info("Successfully exchanged authorization code for tokens");
            return tokenResponse;
        } catch (Exception e) {
            log.error("Error exchanging authorization code for tokens", e);
            throw new RuntimeException("Failed to exchange code for tokens", e);
        }
    }

    /**
     * Refresh access token using refresh token
     *
     * @param refreshToken Refresh token
     * @return TokenResponse with new access_token
     */
    public TokenResponse refreshAccessToken(String refreshToken) {
        try {
            String tokenUrl = "https://" + cognitoDomain + "/oauth2/token";

            Map<String, String> params = new HashMap<>();
            params.put("grant_type", "refresh_token");
            params.put("refresh_token", refreshToken);
            params.put("client_id", clientId);
            params.put("client_secret", clientSecret);

            String bodyString = buildFormUrlEncoded(params);
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(tokenUrl))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(bodyString))
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Cognito token refresh failed: status={}, body={}", response.statusCode(), response.body());
                throw new RuntimeException("Failed to refresh token: " + response.body());
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> tokenMap = objectMapper.readValue(response.body(), Map.class);
            
            TokenResponse tokenResponse = new TokenResponse();
            tokenResponse.setAccessToken((String) tokenMap.get("access_token"));
            tokenResponse.setIdToken((String) tokenMap.get("id_token"));
            tokenResponse.setRefreshToken((String) tokenMap.get("refresh_token"));
            tokenResponse.setExpiresIn((Integer) tokenMap.get("expires_in"));

            log.info("Successfully refreshed access token");
            return tokenResponse;
        } catch (Exception e) {
            log.error("Error refreshing access token", e);
            throw new RuntimeException("Failed to refresh token", e);
        }
    }

    /**
     * Build URL-encoded form data
     */
    private String buildFormUrlEncoded(Map<String, String> params) {
        StringBuilder sb = new StringBuilder();
        params.forEach((key, value) -> {
            if (sb.length() > 0) sb.append("&");
            sb.append(key).append("=").append(value);
        });
        return sb.toString();
    }

    /**
     * Token response DTO
     */
    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class TokenResponse {
        private String accessToken;
        private String idToken;
        private String refreshToken;
        private Integer expiresIn;
        private String tokenType;
    }
}
