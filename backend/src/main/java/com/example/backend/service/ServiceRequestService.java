package com.example.backend.service;

import com.example.backend.model.ServiceRequest;
import com.example.backend.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class ServiceRequestService {
private final ServiceRequestRepository repo;
public ServiceRequestService(ServiceRequestRepository repo) { this.repo = repo; }
public ServiceRequest save(ServiceRequest r) { return repo.save(r); }
public Optional<ServiceRequest> findById(Long id) { return repo.findById(id); }
public List<ServiceRequest> findAll() { return repo.findAll(); }
public void delete(Long id) { repo.deleteById(id); }
    
	public Optional<ServiceRequest> findDuplicate(Long userId, Long vehicleId, LocalDate date, String serviceType) {
		return repo.findByUserUserIdAndVehicleVehicleIdAndPreferredDateAndServiceType(userId, vehicleId, date, serviceType);
	}
}