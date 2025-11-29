package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.example.backend.config.JwtUtil;


@RestController
@RequestMapping("/api/users")
@Validated
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {
private final UserService userService;
private final PasswordEncoder passwordEncoder;
private final JwtUtil jwtUtil;


public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
}


@PostMapping("/signup")
public ResponseEntity<?> signup(@Valid @RequestBody User user) {
Optional<User> existing = userService.findByEmail(user.getEmail());
if (existing.isPresent()) {
return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
}
user.setPassword(passwordEncoder.encode(user.getPassword()));
user.setRole(user.getRole() == null ? "CUSTOMER" : user.getRole());
User saved = userService.save(user);
saved.setPassword(null);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        user.setPassword(null);
        return ResponseEntity.ok(Map.of("token", token, "user", user));
    }


@GetMapping
public List<User> all() { return userService.findAll(); }


@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) {
return userService.findById(id)
.map(u -> { u.setPassword(null); return ResponseEntity.ok(u); })
.orElse(ResponseEntity.notFound().build());
}

@PutMapping("/{id}")
public ResponseEntity<?> update(
        @PathVariable Long id,
        @RequestBody User updatedUser) {

    return userService.findById(id).map(existing -> {

        existing.setName(updatedUser.getName());
        existing.setPhone(updatedUser.getPhone());
        existing.setRole(updatedUser.getRole());

        // Update password only if new one is provided
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        User saved = userService.save(existing);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);

    }).orElse(ResponseEntity.notFound().build());
}


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) {
userService.delete(id);
return ResponseEntity.noContent().build();
}
}