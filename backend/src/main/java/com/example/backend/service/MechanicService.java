package com.example.backend.service;

import org.springframework.stereotype.Service;

import com.example.backend.model.Mechanic;
import com.example.backend.repository.MechanicRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MechanicService {
private final MechanicRepository mechanicRepository;
public MechanicService(MechanicRepository mechanicRepository) { this.mechanicRepository = mechanicRepository; }
public Mechanic save(Mechanic m) { return mechanicRepository.save(m); }
public Optional<Mechanic> findById(Long id) { return mechanicRepository.findById(id); }
public List<Mechanic> findAll() { return mechanicRepository.findAll(); }
public void delete(Long id) { mechanicRepository.deleteById(id); }
}