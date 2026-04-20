package ph.allfix.rework.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * Mapping between PMS user and Cognito user
 * Stored in backend database for tracking and audit purposes
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PMSCognitoMapping implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String pmsUserId;
    private String cognitoUserSub;
    private String email;
    private List<String> groups;
    private String ssoSource;  // "pms_sso"
    private long linkedAt;
    private long lastLoginAt;
    private String status;  // "ACTIVE", "INACTIVE", "SUSPENDED"
}
