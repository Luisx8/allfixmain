package ph.allfix.rework.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Session data stored in Redis for authenticated users
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionData implements Serializable {
    private static final long serialVersionUID = 1L;

    private String sessionId;
    private String userSub;
    private String email;
    private List<String> groups;
    private String accessToken;
    private String refreshToken;
    private long expiresAt;
    private long createdAt;
    private String source;  // "pms_sso", "regular_login", etc.
    private Map<String, Object> attributes;

    public boolean isExpired() {
        return System.currentTimeMillis() > expiresAt;
    }
}
