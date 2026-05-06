package com.parkconnect.task_management.exception;

public class JwtException extends RuntimeException {
    public JwtException(String message) {
        super(message);
    }
}
