package com.example.backend.exceptions;

public class NoAccessToClassException extends RuntimeException {
    public NoAccessToClassException(String message) {
        super(message);
    }
}
