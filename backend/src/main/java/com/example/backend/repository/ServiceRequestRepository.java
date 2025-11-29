package com.example.backend.repository;


import com.example.backend.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;



@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
	Optional<ServiceRequest> findByUserUserIdAndVehicleVehicleIdAndPreferredDateAndServiceType(Long userId, Long vehicleId, LocalDate preferredDate, String serviceType);
}
