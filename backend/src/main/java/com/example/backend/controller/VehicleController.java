package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.model.Vehicle;
import com.example.backend.service.UserService;
import com.example.backend.service.VehicleService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
private final VehicleService vehicleService;
private final UserService userService;


public VehicleController(VehicleService vehicleService, UserService userService) {
this.vehicleService = vehicleService;
this.userService = userService;
}


@PostMapping
public ResponseEntity<?> create(@Valid @RequestBody Vehicle vehicle, @RequestParam(required = false) Long userId) {
    
if (userId != null) {
Optional<User> u = userService.findById(userId);
if (u.isEmpty()) return ResponseEntity.badRequest().body("User not found");
vehicle.setUser(u.get());
}
Vehicle saved = vehicleService.save(vehicle);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<Vehicle> all() { return vehicleService.findAll(); }


@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) {
return vehicleService.findById(id)
.map(ResponseEntity::ok)
.orElse(ResponseEntity.notFound().build());
}


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) {
vehicleService.delete(id);
return ResponseEntity.noContent().build();
}
}