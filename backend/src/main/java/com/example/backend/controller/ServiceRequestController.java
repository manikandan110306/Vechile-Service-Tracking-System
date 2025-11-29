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

            String svcType = body.get("serviceType").toString();
            LocalDate prefDate = LocalDate.parse(body.get("preferredDate").toString());
            req.setServiceType(svcType);
            req.setPreferredDate(prefDate);
            req.setStatus(body.get("status").toString());
            req.setNotes(body.get("notes").toString());

            // Prevent duplicate requests (same user, vehicle, date, service type)
            if (serviceRequestService.findDuplicate(u.get().getUserId(), v.get().getVehicleId(), prefDate, svcType).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate service request");
            }

            ServiceRequest saved = serviceRequestService.save(req);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return serviceRequestService.findById(id).map(existing -> {

            if (body.containsKey("serviceType"))
                existing.setServiceType(body.get("serviceType").toString());

            if (body.containsKey("preferredDate"))
                existing.setPreferredDate(LocalDate.parse(body.get("preferredDate").toString()));

            if (body.containsKey("status"))
                existing.setStatus(body.get("status").toString());

            if (body.containsKey("notes"))
                existing.setNotes(body.get("notes").toString());

            // Optional: update vehicle
            if (body.containsKey("vehicleId")) {
                Long vehicleId = Long.valueOf(body.get("vehicleId").toString());
                vehicleService.findById(vehicleId).ifPresent(existing::setVehicle);
            }

            // Optional: update user
            if (body.containsKey("userId")) {
                Long userId = Long.valueOf(body.get("userId").toString());
                userService.findById(userId).ifPresent(existing::setUser);
            }

            ServiceRequest saved = serviceRequestService.save(existing);
            return ResponseEntity.ok(saved);

        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ServiceRequest> all() {
        return serviceRequestService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return serviceRequestService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        serviceRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
