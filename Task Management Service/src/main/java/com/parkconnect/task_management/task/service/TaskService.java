package com.parkconnect.task_management.task.service;

import com.parkconnect.task_management.task.dto.TaskDto;

import java.util.List;

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
