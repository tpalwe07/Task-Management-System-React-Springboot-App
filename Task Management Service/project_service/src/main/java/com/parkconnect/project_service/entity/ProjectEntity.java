package com.parkconnect.project_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projectId;

    private String title;
    private String description;
    private String startDate;
    private String tenantId;

    @Column(nullable = false)
    private String createdByUserId;       // ← new: ties project to a user

    private String lastModifiedByUserId;  // ← new: audit trail

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
