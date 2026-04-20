package ph.allfix.rework.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.UUID;

/**
 * Cryptographic utilities for HMAC signing and token generation
 */
public class CryptoUtils {

    private static final String HMAC_ALGORITHM = "HmacSHA256";

    /**
     * Generate HMAC-SHA256 signature
     *
     * @param data      Data to sign
     * @param secretKey Secret key for signing
     * @return Base64-encoded signature
     */
    public static String generateHMAC(String data, String secretKey) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
            mac.init(keySpec);
            byte[] signature = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(signature);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Failed to generate HMAC signature", e);
        }
    }

    /**
     * Generate HMAC-SHA256 signature (hex-encoded)
     * Used for PMS trusted handoff signature verification
     *
     * @param data      Data to sign
     * @param secretKey Secret key for signing
     * @return Hex-encoded signature
     */
    public static String generateHMACHex(String data, String secretKey) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
            mac.init(keySpec);
            byte[] signature = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(signature);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Failed to generate HMAC signature", e);
        }
    }

    /**
     * Convert byte array to hex string
     */
    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    /**
     * Verify HMAC signature
     *
     * @param data      Original data
     * @param signature Signature to verify
     * @param secretKey Secret key used for signing
     * @return true if signature is valid
     */
    public static boolean verifyHMAC(String data, String signature, String secretKey) {
        try {
            String computed = generateHMAC(data, secretKey);
            return computed.equals(signature);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Generate a random state token
     *
     * @return Random state token
     */
    public static String generateStateToken() {
        return Base64.getUrlEncoder()
            .withoutPadding()
            .encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generate a secure random string
     *
     * @return Random string
     */
    public static String generateSecureRandom() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
}
