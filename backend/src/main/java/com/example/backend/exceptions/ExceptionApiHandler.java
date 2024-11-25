package com.example.backend.exceptions;

import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class ExceptionApiHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AppError> badCredentialsException(BadCredentialsException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), "Неверный логин и/или пароль!",new Date()),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(PasswordsDoNotMatchException.class)
    public ResponseEntity<AppError> passwordsDoNotMatchException(PasswordsDoNotMatchException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<AppError> userAlreadyExistsException(UserAlreadyExistsException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<AppError> methodArgumentNotValidException(MethodArgumentNotValidException e){
        String validationError=e.getBindingResult().getFieldErrors().getFirst().getDefaultMessage();
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), validationError,new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<AppError> validationException(ValidationException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ClassToLoginError.class)
    public ResponseEntity<AppError> classToLoginNotFound(ClassToLoginError e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotOwnerForNoteException.class)
    public ResponseEntity<AppError> notOwnerForNoteException(NotOwnerForNoteException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ShelfNotFoundException.class)
    public ResponseEntity<AppError> shelfNotFoundException(ShelfNotFoundException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<AppError> bookNotFoundException(BookNotFoundException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoAccessToShelf.class)
    public ResponseEntity<AppError> noAccessToShelf(NoAccessToShelf e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoAccessToClassException.class)
    public ResponseEntity<AppError> noAccessToClassException(NoAccessToClassException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoteNotFoundException.class)
    public ResponseEntity<AppError> noteNotFoundException(NoteNotFoundException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoModerationForNote.class)
    public ResponseEntity<AppError> noModerationForNote(NoModerationForNote e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ClassNotFoundException.class)
    public ResponseEntity<AppError> classNoFoundException(ClassNotFoundException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), e.getMessage(),new Date()),HttpStatus.BAD_REQUEST);
    }


}
