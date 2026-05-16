package com.parkconnect.auth_service.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

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
