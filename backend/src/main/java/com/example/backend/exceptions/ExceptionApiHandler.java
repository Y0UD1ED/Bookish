package com.example.backend.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
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
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<AppError> roleIsNotExistException(DataIntegrityViolationException e){
        return new ResponseEntity<AppError>(new AppError(HttpStatus.BAD_REQUEST.value(), "Данной роли не существует.",new Date()),HttpStatus.BAD_REQUEST);
    }
}
