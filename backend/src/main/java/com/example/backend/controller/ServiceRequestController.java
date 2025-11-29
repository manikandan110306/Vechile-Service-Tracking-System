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

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;
    private final UserService userService;
    private final VehicleService vehicleService;

    public ServiceRequestController(ServiceRequestService serviceRequestService,
            UserService userService,
            VehicleService vehicleService) {
        this.serviceRequestService = serviceRequestService;
        this.userService = userService;
        this.vehicleService = vehicleService;
    }

    // --------------------- CREATE REQUEST ---------------------
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        try {
            if (!body.containsKey("userId") || !body.containsKey("vehicleId")) {
                return ResponseEntity.badRequest().body("userId and vehicleId are required");
            }

            Long userId = Long.valueOf(body.get("userId").toString());
            Long vehicleId = Long.valueOf(body.get("vehicleId").toString());

            Optional<User> u = userService.findById(userId);
            Optional<Vehicle> v = vehicleService.findById(vehicleId);

            if (u.isEmpty() || v.isEmpty()) {
                return ResponseEntity.badRequest().body("User or Vehicle not found");
            }

            ServiceRequest req = new ServiceRequest();
            req.setUser(u.get());
            req.setVehicle(v.get());
            req.setServiceType(body.get("serviceType").toString());
            req.setPreferredDate(LocalDate.parse(body.get("preferredDate").toString()));
            req.setStatus(body.get("status").toString());
            req.setNotes(body.get("notes").toString());

            ServiceRequest saved = serviceRequestService.save(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON: " + e.getMessage());
        }
    }

    // --------------------- GET ALL ---------------------
    @GetMapping
    public List<ServiceRequest> all() {
        return serviceRequestService.findAll();
    }

    // --------------------- GET BY ID ---------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return serviceRequestService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --------------------- DELETE ---------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        serviceRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
