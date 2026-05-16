package com.parkconnect.task_service.exception;

public class JwtException extends RuntimeException {
    public JwtException(String message) {
        super(message);
    }
}
