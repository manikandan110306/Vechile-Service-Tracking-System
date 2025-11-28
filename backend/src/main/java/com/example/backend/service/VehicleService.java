package com.example.backend.service;
import com.example.backend.model.Vehicle;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VehicleRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
private final VehicleRepository vehicleRepository;
private final UserRepository userRepository;


public VehicleService(VehicleRepository vehicleRepository, UserRepository userRepository) {
this.vehicleRepository = vehicleRepository;
this.userRepository = userRepository;
}


public Vehicle save(Vehicle vehicle) { return vehicleRepository.save(vehicle); }
public Optional<Vehicle> findById(Long id) { return vehicleRepository.findById(id); }
public List<Vehicle> findAll() { return vehicleRepository.findAll(); }
public void delete(Long id) { vehicleRepository.deleteById(id); }
}