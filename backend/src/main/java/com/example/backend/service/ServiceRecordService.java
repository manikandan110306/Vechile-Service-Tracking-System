package com.example.backend.service;

import com.example.backend.model.ServiceRecord;
import com.example.backend.repository.ServiceRecordRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceRecordService {

    private final ServiceRecordRepository repo;

    public ServiceRecordService(ServiceRecordRepository repo) {
        this.repo = repo;
    }

    public ServiceRecord save(ServiceRecord r) {
        return repo.save(r);
    }

    public Optional<ServiceRecord> findById(Long id) {
        return repo.findById(id);
    }

    public List<ServiceRecord> findAll() {
        List<ServiceRecord> list = repo.findAll();
        return list != null ? list : new ArrayList<>();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
