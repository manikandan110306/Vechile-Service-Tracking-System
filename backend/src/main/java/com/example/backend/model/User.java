package com.example.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "users")
public class User {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long userId;


@NotBlank
private String name;


@NotBlank
@Email
@Column(unique = true)
private String email;


@NotBlank
private String password;


private String phone;


private String role; // ADMIN / CUSTOMER / MECHANIC


private LocalDateTime createdAt = LocalDateTime.now();


// Relationships
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Vehicle> vehicles = new ArrayList<>();


public User() {}


// Getters and setters
public Long getUserId() { return userId; }
public void setUserId(Long userId) { this.userId = userId; }
public String getName() { return name; }
public void setName(String name) { this.name = name; }
public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }
public String getPassword() { return password; }
public void setPassword(String password) { this.password = password; }
public String getPhone() { return phone; }
public void setPhone(String phone) { this.phone = phone; }
public String getRole() { return role; }
public void setRole(String role) { this.role = role; }
public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
public List<Vehicle> getVehicles() { return vehicles; }
public void setVehicles(List<Vehicle> vehicles) { this.vehicles = vehicles; }
}