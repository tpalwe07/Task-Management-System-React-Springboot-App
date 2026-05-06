package com.parkconnect.task_management.entity;

import com.parkconnect.task_management.Enums.TaskPriorityEnum;
import com.parkconnect.task_management.Enums.TaskStatusEnum;
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

    @Enumerated(EnumType.STRING)
    private TaskStatusEnum status;

    @Enumerated(EnumType.STRING)
    private TaskPriorityEnum priority;
    private Integer projectId;
    private String tenantId;

}
