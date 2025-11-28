package com.example.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "feedbacks")
public class Feedback {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long feedbackId;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User user;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "record_id")
private ServiceRecord serviceRecord;


private Integer rating;
@Column(length = 2000)
private String comments;
private LocalDate date;


public Feedback() {}


// Getters and setters
public Long getFeedbackId() { return feedbackId; }
public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }
public User getUser() { return user; }
public void setUser(User user) { this.user = user; }
public ServiceRecord getServiceRecord() { return serviceRecord; }
public void setServiceRecord(ServiceRecord serviceRecord) { this.serviceRecord = serviceRecord; }
public Integer getRating() { return rating; }
public void setRating(Integer rating) { this.rating = rating; }
public String getComments() { return comments; }
public void setComments(String comments) { this.comments = comments; }
public LocalDate getDate() { return date; }
public void setDate(LocalDate date) { this.date = date; }
}