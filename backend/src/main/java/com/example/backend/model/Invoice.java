package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;


@Entity
@Table(name = "invoices")
public class Invoice {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long invoiceId;


@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "record_id")
private ServiceRecord serviceRecord;


private Double amount;
private Double tax;
private Double totalAmount;
private String paymentStatus; // PAID / UNPAID
private LocalDate paymentDate;


public Invoice() {}


// Getters and setters
public Long getInvoiceId() { return invoiceId; }
public void setInvoiceId(Long invoiceId) { this.invoiceId = invoiceId; }
public ServiceRecord getServiceRecord() { return serviceRecord; }
public void setServiceRecord(ServiceRecord serviceRecord) { this.serviceRecord = serviceRecord; }
public Double getAmount() { return amount; }
public void setAmount(Double amount) { this.amount = amount; }
public Double getTax() { return tax; }
public void setTax(Double tax) { this.tax = tax; }
public Double getTotalAmount() { return totalAmount; }
public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
public String getPaymentStatus() { return paymentStatus; }
public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
public LocalDate getPaymentDate() { return paymentDate; }
public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
}