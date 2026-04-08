package com.parkconnect.task_management.task.service;

import com.parkconnect.task_management.task.dto.TaskDto;
import com.parkconnect.task_management.task.entity.TaskEntity;
import com.parkconnect.task_management.task.mapper.TaskMapper;
import com.parkconnect.task_management.task.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    public TaskDto addNewTask(Integer projectId, TaskDto taskDto){
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setProjectId(projectId);

        TaskEntity newTask = TaskMapper.TaskDtoToEntity(taskDto, taskEntity);

        TaskEntity result = taskListRepository.save(newTask);
        return TaskMapper.TaskEntityToDto(result);
    }
}
