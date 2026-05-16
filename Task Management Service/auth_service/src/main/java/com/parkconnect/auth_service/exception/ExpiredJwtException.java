package com.parkconnect.auth_service.exception;

public class ExpiredJwtException extends RuntimeException {
    public ExpiredJwtException(String message) {
        super(message);
    }
}
