package com.example.backend.controller;

import com.example.backend.model.SparePart;
import com.example.backend.service.SparePartService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class SparePartController {
private final SparePartService sparePartService;
public SparePartController(SparePartService sparePartService) { this.sparePartService = sparePartService; }


@PostMapping
public ResponseEntity<?> create(@RequestBody SparePart p) { return ResponseEntity.status(HttpStatus.CREATED).body(sparePartService.save(p)); }
@GetMapping
public List<SparePart> all() { return sparePartService.findAll(); }
@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) { return sparePartService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }
@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { sparePartService.delete(id); return ResponseEntity.noContent().build(); }
}