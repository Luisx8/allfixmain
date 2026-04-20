package ph.allfix.rework.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * State token data stored in Redis for CSRF protection
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StateData implements Serializable {
    private static final long serialVersionUID = 1L;

    private String userId;
    private String email;
    private long createdAt;
    private String signature;
    private String source;
    private long expiresAt;

    public boolean isExpired() {
        return System.currentTimeMillis() > expiresAt;
    }
}
