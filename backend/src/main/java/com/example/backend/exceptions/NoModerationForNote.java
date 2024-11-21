package com.example.backend.exceptions;

public class NoModerationForNote extends RuntimeException {
    public NoModerationForNote(String message) {
        super(message);
    }
}
