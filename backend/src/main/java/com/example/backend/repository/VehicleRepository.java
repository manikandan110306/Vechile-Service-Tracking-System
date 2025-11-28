package com.example.backend.repository;

import com.example.backend.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
