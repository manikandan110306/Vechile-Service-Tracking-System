package com.example.backend.service;

import com.example.backend.model.Invoice;
import com.example.backend.repository.InvoiceRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {
private final InvoiceRepository repo;
public InvoiceService(InvoiceRepository repo) { this.repo = repo; }
public Invoice save(Invoice i) { return repo.save(i); }
public Optional<Invoice> findById(Long id) { return repo.findById(id); }
public List<Invoice> findAll() { return repo.findAll(); }
public void delete(Long id) { repo.deleteById(id); }
}