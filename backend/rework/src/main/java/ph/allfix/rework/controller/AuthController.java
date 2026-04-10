package ph.allfix.rework.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ph.allfix.rework.entity.User;
import ph.allfix.rework.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allows calls from frontend (Vite default localhost:5173) Let's make it broad for DEV
public class AuthController {
    
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sync-customer")
    public ResponseEntity<?> syncCustomer(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        User savedUser = userService.registerCustomer(email);
        return ResponseEntity.ok(savedUser);
    }
}
