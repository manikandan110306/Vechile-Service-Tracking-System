package com.example.backend.repository;


import com.example.backend.model.ServicePartUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ServicePartUsageRepository extends JpaRepository<ServicePartUsage, Long> {
}