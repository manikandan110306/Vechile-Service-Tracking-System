package com.example.backend.controller;

import com.example.backend.model.Invoice;
import com.example.backend.service.InvoiceService;
import com.example.backend.service.ServiceRecordService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
private final InvoiceService invoiceService;
private final ServiceRecordService recordService;


public InvoiceController(InvoiceService invoiceService, ServiceRecordService recordService) { this.invoiceService = invoiceService; this.recordService = recordService; }


@PostMapping
public ResponseEntity<?> create(@RequestBody Invoice invoice, @RequestParam Long recordId) {
recordService.findById(recordId).ifPresent(invoice::setServiceRecord);
Invoice saved = invoiceService.save(invoice);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<Invoice> all() { return invoiceService.findAll(); }


@GetMapping("/{id}")
public ResponseEntity<?> get(@PathVariable Long id) { return invoiceService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build()); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { invoiceService.delete(id); return ResponseEntity.noContent().build(); }
}