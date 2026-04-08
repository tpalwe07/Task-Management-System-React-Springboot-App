package com.parkconnect.task_management.task.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tasks")
@Data
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;

    private String title;
    private String description;
    private String status;
    private Integer priority;
    private Integer projectId;
    private String tenantId;

}
