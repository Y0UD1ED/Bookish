package com.example.backend.controllers;

import com.example.backend.dtos.AuthRequest;
import com.example.backend.dtos.JwtResponse;
import com.example.backend.dtos.RegRequest;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AppError;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@Validated
@AllArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> sendToken(@Valid @RequestBody AuthRequest authRequest){
        return ResponseEntity.ok(authService.login(authRequest));
    }


    @GetMapping("/refresh")
    public ResponseEntity<JwtResponse> getAccessToken(@CookieValue(name = "refreshToken") String refreshToken) {
        return ResponseEntity.ok(authService.getAccessToken(refreshToken));
    }

    @PostMapping("/reg")
    public ResponseEntity<JwtResponse> regUser(@Valid @RequestBody RegRequest regRequest){
        return ResponseEntity.ok(authService.regUser(regRequest));
    }



    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        authService.logout();
        return ResponseEntity.ok("success logout");
    }
}
