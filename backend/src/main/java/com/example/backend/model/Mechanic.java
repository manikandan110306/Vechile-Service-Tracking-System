package com.example.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "mechanics")
public class Mechanic {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long mechanicId;


@NotBlank
private String name;
private String phone;
private String specialization;
private Integer experience; // years
private String availabilityStatus;


@OneToMany(mappedBy = "mechanic", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<ServiceRecord> assignedServices = new ArrayList<>();


public Mechanic() {}


// Getters and setters
public Long getMechanicId() { return mechanicId; }
public void setMechanicId(Long mechanicId) { this.mechanicId = mechanicId; }
public String getName() { return name; }
public void setName(String name) { this.name = name; }
public String getPhone() { return phone; }
public void setPhone(String phone) { this.phone = phone; }
public String getSpecialization() { return specialization; }
public void setSpecialization(String specialization) { this.specialization = specialization; }
public Integer getExperience() { return experience; }
public void setExperience(Integer experience) { this.experience = experience; }
public String getAvailabilityStatus() { return availabilityStatus; }
public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }
public List<ServiceRecord> getAssignedServices() { return assignedServices; }
public void setAssignedServices(List<ServiceRecord> assignedServices) { this.assignedServices = assignedServices; }
}