package ph.allfix.rework.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Test controller for basic health checks
 */
@RestController
@RequestMapping("/")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> index() {
        return ResponseEntity.ok(Map.of(
            "message", "Allfix Backend - OAuth2 SSO Service",
            "version", "0.0.1-SNAPSHOT",
            "status", "running",
            "endpoints", Map.of(
                "health", "GET /health",
                "initiate_sso", "GET /oauth/initiate-sso?user_id=X&email=Y&timestamp=T&signature=S",
                "oauth_callback", "GET /oauth/login/oauth2/code/cognito?code=XXX&state=YYY",
                "frontend_callback", "GET /auth/callback (on frontend app)"
            )
        ));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "allfix-backend"
        ));
    }
}
