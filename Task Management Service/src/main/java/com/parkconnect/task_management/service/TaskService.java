package com.parkconnect.task_management.service;

import com.parkconnect.task_management.dto.TaskDto;

public interface TaskService {
    TaskDto addNewTask(Integer projectId, TaskDto task);

//    List<TaskDto> getTasks();
//
//    TaskDto getTaskById(Integer taskId);
//
//    void deleteTask(Integer taskId);
//
//    String updateTask(Integer taskId, TaskDto taskDto);
}
