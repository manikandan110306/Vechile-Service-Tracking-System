package com.example.backend.service;

import com.example.backend.model.Feedback;
import com.example.backend.repository.FeedbackRepository;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
private final FeedbackRepository repo;
public FeedbackService(FeedbackRepository repo) { this.repo = repo; }
public Feedback save(Feedback f) { return repo.save(f); }
public Optional<Feedback> findById(Long id) { return repo.findById(id); }
public List<Feedback> findAll() { return repo.findAll(); }
public void delete(Long id) { repo.deleteById(id); }
}