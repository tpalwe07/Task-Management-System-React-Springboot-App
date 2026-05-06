package com.parkconnect.task_management.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.parkconnect.task_management.Enums.TaskPriorityEnum;
import com.parkconnect.task_management.Enums.TaskStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    private Integer taskId;

    private String title;
    private String description;
    private TaskStatusEnum status;
    private TaskPriorityEnum priority;
    private Integer projectId;
    private String tenantId;
}
