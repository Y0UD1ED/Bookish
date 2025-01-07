package com.example.backend.exceptions;

public class ClassNotFoundException extends RuntimeException{
    public ClassNotFoundException(String message) {
        super(message);
    }
}
