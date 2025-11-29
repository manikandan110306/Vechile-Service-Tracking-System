package com.example.backend.controller;

import com.example.backend.model.Vehicle;
import com.example.backend.service.VehicleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    // ---------------- CREATE ----------------
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Vehicle v) {
        // Prevent duplicates by vehicleNumber
        if (v.getVehicleNumber() != null && !v.getVehicleNumber().isBlank()) {
            service.findAll().stream()
                    .filter(existing -> v.getVehicleNumber().equals(existing.getVehicleNumber()))
                    .findAny().ifPresent(existing -> {
                        // noop — handled below
                    });
            // use repository lookup for efficiency
            if (service.getRepository() != null) {
                // repository-based check (if available)
                if (service.getRepository().findByVehicleNumber(v.getVehicleNumber()).isPresent()) {
                    return ResponseEntity.status(409).body("Vehicle with this number already exists");
                }
            }
        }

        Vehicle saved = service.save(v);
        return ResponseEntity.status(201).body(saved);
    }

    // ---------------- READ ALL ----------------
    @GetMapping
    public List<Vehicle> list() {
        return service.findAll();
    }

    // ---------------- READ ONE ----------------
    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ---------------- UPDATE ----------------
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Vehicle v) {
        return service.findById(id)
                .map(old -> {
                    old.setVehicleNumber(v.getVehicleNumber());
                    old.setBrand(v.getBrand());
                    old.setModel(v.getModel());
                    old.setYear(v.getYear());
                    old.setVehicleType(v.getVehicleType());
                    old.setFuelType(v.getFuelType());
                    return ResponseEntity.ok(service.save(old));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ---------------- DELETE ----------------
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
