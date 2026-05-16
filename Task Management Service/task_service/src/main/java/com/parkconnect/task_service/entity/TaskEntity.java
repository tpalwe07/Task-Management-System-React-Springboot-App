package com.parkconnect.task_service.entity;

import com.parkconnect.task_service.Enums.TaskPriorityEnum;
import com.parkconnect.task_service.Enums.TaskStatusEnum;
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
