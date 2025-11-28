package com.example.backend.controller;

import com.example.backend.model.ServiceRequest;
import com.example.backend.model.User;
import com.example.backend.model.Vehicle;
import com.example.backend.service.ServiceRequestService;
import com.example.backend.service.UserService;
import com.example.backend.service.VehicleService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {
private final ServiceRequestService serviceRequestService;
private final UserService userService;
private final VehicleService vehicleService;


public ServiceRequestController(ServiceRequestService serviceRequestService, UserService userService, VehicleService vehicleService) {
this.serviceRequestService = serviceRequestService;
this.userService = userService;
this.vehicleService = vehicleService;
}


@PostMapping
public ResponseEntity<?> create(@RequestBody ServiceRequest req, @RequestParam Long userId, @RequestParam Long vehicleId) {
Optional<User> u = userService.findById(userId);
Optional<Vehicle> v = vehicleService.findById(vehicleId);
if (u.isEmpty() || v.isEmpty()) return ResponseEntity.badRequest().body("User or Vehicle not found");
req.setUser(u.get()); req.setVehicle(v.get());
ServiceRequest saved = serviceRequestService.save(req);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<ServiceRequest> all() { return serviceRequestService.findAll(); }


@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) { return serviceRequestService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { serviceRequestService.delete(id); return ResponseEntity.noContent().build(); }
}