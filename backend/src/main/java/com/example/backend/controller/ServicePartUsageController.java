package com.example.backend.controller;

import com.example.backend.model.ServicePartUsage;
import com.example.backend.service.ServicePartUsageService;
import com.example.backend.service.ServiceRecordService;
import com.example.backend.service.SparePartService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usage")
public class ServicePartUsageController {
private final ServicePartUsageService usageService;
private final ServiceRecordService recordService;
private final SparePartService sparePartService;


public ServicePartUsageController(ServicePartUsageService usageService, ServiceRecordService recordService, SparePartService sparePartService) {
this.usageService = usageService; this.recordService = recordService; this.sparePartService = sparePartService;
}


@PostMapping
public ResponseEntity<?> create(@RequestBody ServicePartUsage usage, @RequestParam Long recordId, @RequestParam Long partId) {
recordService.findById(recordId).ifPresent(usage::setServiceRecord);
sparePartService.findById(partId).ifPresent(usage::setSparePart);
ServicePartUsage saved = usageService.save(usage);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<ServicePartUsage> all() { return usageService.findAll(); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { usageService.delete(id); return ResponseEntity.noContent().build(); }
}