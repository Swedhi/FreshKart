package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;

    // Register User
    @PostMapping("/register")
    public User register(
            @RequestBody RegisterRequest request
    ) {

        return authService.register(
                request
        );
    }

    // Login User
    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request
    ) {

        return authService.login(
                request
        );
    }

    // Test Protected Route
    @GetMapping("/me")
    public String getCurrentUser() {

        return "JWT Authentication Working";
    }
}