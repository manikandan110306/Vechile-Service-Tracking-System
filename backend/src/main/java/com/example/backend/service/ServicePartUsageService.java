package com.example.backend.service;

import com.example.backend.model.ServicePartUsage;
import com.example.backend.repository.ServicePartUsageRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ServicePartUsageService {
private final ServicePartUsageRepository repo;
public ServicePartUsageService(ServicePartUsageRepository repo) { this.repo = repo; }
public ServicePartUsage save(ServicePartUsage u) { return repo.save(u); }
public Optional<ServicePartUsage> findById(Long id) { return repo.findById(id); }
public List<ServicePartUsage> findAll() { return repo.findAll(); }
public void delete(Long id) { repo.deleteById(id); }
}