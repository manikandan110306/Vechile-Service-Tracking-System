package com.example.backend.controller;

import com.example.backend.model.Mechanic;
import com.example.backend.service.MechanicService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
public class MechanicController {
private final MechanicService mechanicService;
public MechanicController(MechanicService mechanicService) { this.mechanicService = mechanicService; }


@PostMapping
public ResponseEntity<?> create(@Valid @RequestBody Mechanic m) {
Mechanic saved = mechanicService.save(m);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<Mechanic> all() { return mechanicService.findAll(); }


@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) { return mechanicService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { mechanicService.delete(id); return ResponseEntity.noContent().build(); }
}