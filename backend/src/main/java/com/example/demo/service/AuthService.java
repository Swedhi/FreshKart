package com.example.demo.service;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User register(RegisterRequest request) {

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .createdAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    public AuthResponse login(
        LoginRequest request
) {

    User user =
            userRepository
                    .findByEmail(
                            request.getEmail()
                    )
                    .orElseThrow(
                            () -> new RuntimeException(
                                    "Invalid Email"
                            )
                    );

    if (
            !passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            )
    ) {

        throw new RuntimeException(
                "Invalid Password"
        );
    }

    String token =
            jwtService.generateToken(
                    user.getEmail()
            );

    return new AuthResponse(
        token,
        user.getId(),
        user.getEmail()
);
}
    
}