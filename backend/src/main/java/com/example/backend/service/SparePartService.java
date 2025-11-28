package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.model.SparePart;
import com.example.backend.repository.SparePartRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SparePartService {
private final SparePartRepository repo;
public SparePartService(SparePartRepository repo) { this.repo = repo; }
public SparePart save(SparePart p) { return repo.save(p); }
public Optional<SparePart> findById(Long id) { return repo.findById(id); }
public List<SparePart> findAll() { return repo.findAll(); }
public void delete(Long id) { repo.deleteById(id); }
}