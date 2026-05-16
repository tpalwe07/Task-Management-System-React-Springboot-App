package com.parkconnect.task_service.exception;

public class ExpiredJwtException extends RuntimeException {
    public ExpiredJwtException(String message) {
        super(message);
    }
}
