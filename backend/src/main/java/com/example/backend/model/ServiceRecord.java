package com.example.backend.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "service_records")
public class ServiceRecord {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long recordId;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "vehicle_id")
@JsonIgnore
private Vehicle vehicle;


@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "request_id")
private ServiceRequest serviceRequest;


private LocalDate serviceDate;
@Column(length = 2000)
private String description;
private Double totalCost;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "mechanic_id")
private Mechanic mechanic;


@OneToMany(mappedBy = "serviceRecord", cascade = CascadeType.ALL, orphanRemoval = true)
private List<ServicePartUsage> partsUsed = new ArrayList<>();


public ServiceRecord() {}


// Getters and setters
public Long getRecordId() { return recordId; }
public void setRecordId(Long recordId) { this.recordId = recordId; }
public Vehicle getVehicle() { return vehicle; }
public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }
public ServiceRequest getServiceRequest() { return serviceRequest; }
public void setServiceRequest(ServiceRequest serviceRequest) { this.serviceRequest = serviceRequest; }
public LocalDate getServiceDate() { return serviceDate; }
public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }
public String getDescription() { return description; }
public void setDescription(String description) { this.description = description; }
public Double getTotalCost() { return totalCost; }
public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }
public Mechanic getMechanic() { return mechanic; }
public void setMechanic(Mechanic mechanic) { this.mechanic = mechanic; }
public List<ServicePartUsage> getPartsUsed() { return partsUsed; }
public void setPartsUsed(List<ServicePartUsage> partsUsed) { this.partsUsed = partsUsed; }
}