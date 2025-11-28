package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;


@Entity
@Table(name = "notifications")
public class Notification {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long notificationId;


@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User user;


private String message;
private String type; // REMINDER / UPDATE / ALERT
private LocalDateTime createdAt = LocalDateTime.now();
private Boolean isRead = false;


public Notification() {}


// Getters and setters
public Long getNotificationId() { return notificationId; }
public void setNotificationId(Long notificationId) { this.notificationId = notificationId; }
public User getUser() { return user; }
public void setUser(User user) { this.user = user; }
public String getMessage() { return message; }
public void setMessage(String message) { this.message = message; }
public String getType() { return type; }
public void setType(String type) { this.type = type; }
public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
public Boolean getIsRead() { return isRead; }
public void setIsRead(Boolean isRead) { this.isRead = isRead; }
}