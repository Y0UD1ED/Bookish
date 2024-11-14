package com.example.backend.controllers;

import com.example.backend.dtos.AuthRequest;
import com.example.backend.dtos.JwtResponse;
import com.example.backend.dtos.RegRequest;
import com.example.backend.entities.User;
import com.example.backend.exceptions.AppError;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@AllArgsConstructor
@RestController
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/auth")
    public ResponseEntity<JwtResponse> sendToken(@RequestBody AuthRequest authRequest){
        return ResponseEntity.ok(authService.login(authRequest));
    }


    @GetMapping("/access_token")
    public ResponseEntity<JwtResponse> getAccessToken(@RequestParam(name = "refresh_token") String refreshToken) {
        return ResponseEntity.ok(authService.getAccessToken(refreshToken));
    }

    @PostMapping("/reg")
    public ResponseEntity<JwtResponse> regUser(@RequestBody RegRequest regRequest){
        return ResponseEntity.ok(authService.regUser(regRequest));
    }



    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        authService.logout();
        return ResponseEntity.ok("success logout");
    }
}