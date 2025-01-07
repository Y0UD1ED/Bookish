package com.example.backend.exceptions;

public class NotOwnerForNoteException extends RuntimeException {
    public NotOwnerForNoteException(String message) {
        super(message);
    }
}
