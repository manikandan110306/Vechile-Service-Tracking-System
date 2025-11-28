package com.example.backend.controller;

import com.example.backend.model.Notification;
import com.example.backend.service.NotificationService;
import com.example.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
private final NotificationService notificationService;
private final UserService userService;


public NotificationController(NotificationService notificationService, UserService userService) { this.notificationService = notificationService; this.userService = userService; }


@PostMapping
public ResponseEntity<?> create(@RequestBody Notification n, @RequestParam Long userId) {
userService.findById(userId).ifPresent(n::setUser);
Notification saved = notificationService.save(n);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<Notification> all() { return notificationService.findAll(); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { notificationService.delete(id); return ResponseEntity.noContent().build(); }
}