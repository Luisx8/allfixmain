package ph.allfix.rework.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Spring Security Configuration for OAuth2 Resource Server
 * Enables JWT token validation from AWS Cognito
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;

    /**
     * Configure HTTP security for OAuth2 resource server
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // Disable CSRF for OAuth2 flows
            .csrf(csrf -> csrf.disable())
            
            // Session management
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            
            // OAuth2 Resource Server - JWT validation
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwkSetUri(jwkSetUri))
            )
            
            // Authorization rules
            .authorizeHttpRequests(authz -> authz
                // Public endpoints
                .requestMatchers(HttpMethod.GET, "/", "/health", "/actuator/**").permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers(HttpMethod.GET, "/oauth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/oauth/pms-trusted-entry").permitAll()  // PMS trusted handoff
                .requestMatchers(HttpMethod.GET, "/oauth/initiate-sso").permitAll()
                .requestMatchers(HttpMethod.POST, "/oauth/bridge/session").permitAll()
                .requestMatchers(HttpMethod.GET, "/login/oauth2/code/cognito").permitAll()
                .requestMatchers(HttpMethod.GET, "/oauth/login/oauth2/code/cognito").permitAll()
                .requestMatchers(HttpMethod.GET, "/oauth/health").permitAll()
                
                // Protected endpoints
                .requestMatchers("/dashboard", "/user/**", "/admin/**", "/vendor/**", "/personnel/**")
                    .authenticated()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            
            // Logout configuration
            .logout(logout -> logout
                .logoutUrl("/logout")
                .deleteCookies("JSESSIONID")
                .permitAll()
            );

        return http.build();
    }

    /**
     * CORS Configuration Source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:8080"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
