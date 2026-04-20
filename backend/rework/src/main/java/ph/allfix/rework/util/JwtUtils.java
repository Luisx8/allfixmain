package ph.allfix.rework.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * JWT utility functions for decoding and extracting claims
 */
@Slf4j
public class JwtUtils {

    /**
     * Decode JWT token (without verification - relies on Spring Security)
     *
     * @param token JWT token
     * @return Decoded JWT
     */
    public static DecodedJWT decodeToken(String token) {
        try {
            return JWT.decode(token);
        } catch (JWTDecodeException e) {
            log.error("Failed to decode JWT token", e);
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    /**
     * Extract user subject (sub claim)
     *
     * @param token JWT token
     * @return User subject
     */
    public static String extractSubject(String token) {
        DecodedJWT jwt = decodeToken(token);
        return jwt.getSubject();
    }

    /**
     * Extract email claim
     *
     * @param token JWT token
     * @return Email
     */
    public static String extractEmail(String token) {
        DecodedJWT jwt = decodeToken(token);
        return jwt.getClaim("email").asString();
    }

    /**
     * Extract Cognito groups
     *
     * @param token JWT token
     * @return List of groups
     */
    public static List<String> extractGroups(String token) {
        DecodedJWT jwt = decodeToken(token);
        List<String> groups = jwt.getClaim("cognito:groups").asList(String.class);
        return groups != null ? groups : List.of();
    }

    /**
     * Extract all claims as a map
     *
     * @param token JWT token
     * @return Claims
     */
    public static String extractClaim(String token, String claimName) {
        DecodedJWT jwt = decodeToken(token);
        return jwt.getClaim(claimName).asString();
    }

    /**
     * Check if token is expired
     *
     * @param token JWT token
     * @return true if expired
     */
    public static boolean isExpired(String token) {
        try {
            DecodedJWT jwt = decodeToken(token);
            return jwt.getExpiresAt() != null && 
                   jwt.getExpiresAt().getTime() < System.currentTimeMillis();
        } catch (Exception e) {
            return true;
        }
    }
}
