package ph.allfix.rework.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * Compatibility bridge for Cognito callbacks.
 * Keeps the registered redirect URI stable while forwarding to the existing OAuth controller path.
 */
@RestController
public class OAuthCallbackBridgeController {

    @GetMapping("/login/oauth2/code/cognito")
    public RedirectView bridgeCognitoCallback(
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String error,
            @RequestParam(required = false) String error_description,
            @RequestParam(required = false) String state) {

        StringBuilder redirect = new StringBuilder("/oauth/login/oauth2/code/cognito");
        boolean hasParam = false;

        if (code != null) {
            redirect.append(hasParam ? "&" : "?").append("code=")
                .append(URLEncoder.encode(code, StandardCharsets.UTF_8));
            hasParam = true;
        }
        if (error != null) {
            redirect.append(hasParam ? "&" : "?").append("error=")
                .append(URLEncoder.encode(error, StandardCharsets.UTF_8));
            hasParam = true;
        }
        if (error_description != null) {
            redirect.append(hasParam ? "&" : "?").append("error_description=")
                .append(URLEncoder.encode(error_description, StandardCharsets.UTF_8));
            hasParam = true;
        }
        if (state != null) {
            redirect.append(hasParam ? "&" : "?").append("state=")
                .append(URLEncoder.encode(state, StandardCharsets.UTF_8));
        }

        return new RedirectView(redirect.toString());
    }
}
