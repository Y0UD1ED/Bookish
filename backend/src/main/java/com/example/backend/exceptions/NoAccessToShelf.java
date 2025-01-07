package com.example.backend.exceptions;

public class NoAccessToShelf extends RuntimeException {
    public NoAccessToShelf(String message) {
        super(message);
    }
}
