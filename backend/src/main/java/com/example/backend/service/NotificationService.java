package com.example.backend.service;

import com.example.backend.model.Notification;
import com.example.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
private final NotificationRepository repo;
public NotificationService(NotificationRepository repo) { this.repo = repo; }
public Notification save(Notification n) { return repo.save(n); }
public Optional<Notification> findById(Long id) { return repo.findById(id); }
public List<Notification> findAll() { return repo.findAll(); }
public void delete(Long id) { repo.deleteById(id); }
}