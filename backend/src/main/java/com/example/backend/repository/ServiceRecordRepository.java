package com.example.backend.repository;


import com.example.backend.model.ServiceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface ServiceRecordRepository extends JpaRepository<ServiceRecord, Long> {
}
