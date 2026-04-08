package com.parkconnect.task_management.task.mapper;

import com.parkconnect.task_management.config.TenantContext;
import com.parkconnect.task_management.task.dto.TaskDto;
import com.parkconnect.task_management.task.entity.TaskEntity;

public class TaskMapper {

    public static TaskEntity TaskDtoToEntity(TaskDto taskDto, TaskEntity taskEntity){
        if(taskDto.getTaskId() != null) taskEntity.setTaskId(taskDto.getTaskId());
        if(taskDto.getTitle() != null) taskEntity.setTitle(taskDto.getTitle());
        if(taskDto.getDescription() != null) taskEntity.setDescription(taskDto.getDescription());
        if(taskDto.getStatus() != null) taskEntity.setStatus(taskDto.getStatus());
        if(taskDto.getPriority() != null) taskEntity.setPriority(taskDto.getPriority());
        taskEntity.setTenantId(TenantContext.DEFAULT_TENANT);

        return taskEntity;
    }
    public static TaskDto TaskEntityToDto(TaskEntity taskEntity){
        TaskDto taskDto = new TaskDto(taskEntity.getTaskId(), taskEntity.getTitle(), taskEntity.getDescription(), taskEntity.getStatus(), taskEntity.getPriority(), taskEntity.getProjectId(), taskEntity.getTenantId());
        return taskDto;
    }
}
