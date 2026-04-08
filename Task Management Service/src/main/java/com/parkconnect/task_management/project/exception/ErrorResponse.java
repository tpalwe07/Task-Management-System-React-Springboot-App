package com.parkconnect.task_management.project.exception;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    
    private int status;
    private String message;
    private String path;
    private LocalDateTime timestamp;

    // For validation errors
    private List<String> errors;
}
