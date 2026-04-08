package com.parkconnect.task_management.task.controller;

import com.parkconnect.task_management.project.dto.ApiResponseDto;
import com.parkconnect.task_management.task.dto.TaskDto;
import com.parkconnect.task_management.task.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/api")
@CrossOrigin("*")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {this.taskService = taskService;}

    @PostMapping("/{projectId}/addTask")
    public ResponseEntity<ApiResponseDto<TaskDto>> addTask(@PathVariable Integer projectId, @RequestBody TaskDto taskDto){
        TaskDto savedTaskDto = taskService.addNewTask(projectId, taskDto);

        ApiResponseDto<TaskDto> response = new ApiResponseDto<TaskDto>
                                                            (201,
                                                            "Task created successfully",
                                                                    savedTaskDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
