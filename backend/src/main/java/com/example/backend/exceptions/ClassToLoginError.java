package com.example.backend.exceptions;

public class ClassToLoginError extends RuntimeException {
    public ClassToLoginError(String message) {
        super(message);
    }
}
