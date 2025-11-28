package com.example.backend.controller;

import com.example.backend.model.ServiceRecord;
import com.example.backend.model.Vehicle;
import com.example.backend.service.MechanicService;
import com.example.backend.service.ServiceRecordService;
import com.example.backend.service.ServiceRequestService;
import com.example.backend.service.VehicleService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/records")
public class ServiceRecordController {
private final ServiceRecordService recordService;
private final VehicleService vehicleService;
private final ServiceRequestService requestService;
private final MechanicService mechanicService;


public ServiceRecordController(ServiceRecordService recordService, VehicleService vehicleService, ServiceRequestService requestService, MechanicService mechanicService) {
this.recordService = recordService;
this.vehicleService = vehicleService;
this.requestService = requestService;
this.mechanicService = mechanicService;
}


@PostMapping
public ResponseEntity<?> create(@RequestBody ServiceRecord record, @RequestParam Long vehicleId, @RequestParam(required = false) Long requestId, @RequestParam(required = false) Long mechanicId) {
Optional<Vehicle> v = vehicleService.findById(vehicleId);
if (v.isEmpty()) return ResponseEntity.badRequest().body("Vehicle not found");
record.setVehicle(v.get());
if (requestId != null) {
requestService.findById(requestId).ifPresent(record::setServiceRequest);
}
if (mechanicId != null) {
mechanicService.findById(mechanicId).ifPresent(record::setMechanic);
}
ServiceRecord saved = recordService.save(record);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<ServiceRecord> all() { return recordService.findAll(); }


@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) { return recordService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { recordService.delete(id); return ResponseEntity.noContent().build(); }
}