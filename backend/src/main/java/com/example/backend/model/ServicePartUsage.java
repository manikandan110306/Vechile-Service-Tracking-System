package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "service_part_usage")
public class ServicePartUsage {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long usageId;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "record_id")
@JsonIgnore
private ServiceRecord serviceRecord;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "part_id")
private SparePart sparePart;


private Integer quantity;


public ServicePartUsage() {}


// Getters and setters
public Long getUsageId() { return usageId; }
public void setUsageId(Long usageId) { this.usageId = usageId; }
public ServiceRecord getServiceRecord() { return serviceRecord; }
public void setServiceRecord(ServiceRecord serviceRecord) { this.serviceRecord = serviceRecord; }
public SparePart getSparePart() { return sparePart; }
public void setSparePart(SparePart sparePart) { this.sparePart = sparePart; }
public Integer getQuantity() { return quantity; }
public void setQuantity(Integer quantity) { this.quantity = quantity; }
}