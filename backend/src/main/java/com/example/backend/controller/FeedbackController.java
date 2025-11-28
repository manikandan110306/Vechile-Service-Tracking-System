package com.example.backend.controller;

import com.example.backend.model.Feedback;
import com.example.backend.service.FeedbackService;
import com.example.backend.service.ServiceRecordService;
import com.example.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {
private final FeedbackService feedbackService;
private final UserService userService;
private final ServiceRecordService recordService;


public FeedbackController(FeedbackService feedbackService, UserService userService, ServiceRecordService recordService) {
this.feedbackService = feedbackService; this.userService = userService; this.recordService = recordService;
}


@PostMapping
public ResponseEntity<?> create(@RequestBody Feedback f, @RequestParam Long userId, @RequestParam Long recordId) {
userService.findById(userId).ifPresent(f::setUser);
recordService.findById(recordId).ifPresent(f::setServiceRecord);
Feedback saved = feedbackService.save(f);
return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}


@GetMapping
public List<Feedback> all() { return feedbackService.findAll(); }


@DeleteMapping("/{id}")
public ResponseEntity<?> delete(@PathVariable Long id) { feedbackService.delete(id); return ResponseEntity.noContent().build(); }
}
