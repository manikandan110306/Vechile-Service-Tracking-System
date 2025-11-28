package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {
private final UserRepository userRepository;


public UserService(UserRepository userRepository) {
this.userRepository = userRepository;
}


public User save(User user) { return userRepository.save(user); }
public Optional<User> findById(Long id) { return userRepository.findById(id); }
public Optional<User> findByEmail(String email) { return userRepository.findByEmail(email); }
public List<User> findAll() { return userRepository.findAll(); }
public void delete(Long id) { userRepository.deleteById(id); }
}