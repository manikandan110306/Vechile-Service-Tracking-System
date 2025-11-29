package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "vehicles")
public class Vehicle {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long vehicleId;


@NotBlank
@Column(unique = true)
private String vehicleNumber;


private String brand;
private String model;
private Integer year;
private String vehicleType;
private String fuelType;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
@JsonIgnore
private User user;


@OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
@JsonIgnore
private List<ServiceRecord> serviceRecords = new ArrayList<>();


public Vehicle() {}


// Getters and setters
public Long getVehicleId() { return vehicleId; }
public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }
public String getVehicleNumber() { return vehicleNumber; }
public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }
public String getBrand() { return brand; }
public void setBrand(String brand) { this.brand = brand; }
public String getModel() { return model; }
public void setModel(String model) { this.model = model; }
public Integer getYear() { return year; }
public void setYear(Integer year) { this.year = year; }
public String getVehicleType() { return vehicleType; }
public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }
public String getFuelType() { return fuelType; }
public void setFuelType(String fuelType) { this.fuelType = fuelType; }
public User getUser() { return user; }
public void setUser(User user) { this.user = user; }
public List<ServiceRecord> getServiceRecords() { return serviceRecords; }
public void setServiceRecords(List<ServiceRecord> serviceRecords) { this.serviceRecords = serviceRecords; }
}