package com.yash.stickynotes.service;

import com.yash.stickynotes.dto.response.ApiResponse;
import com.yash.stickynotes.dto.request.SignupRequest;
import com.yash.stickynotes.entity.User;
import com.yash.stickynotes.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.yash.stickynotes.dto.request.LoginRequest;
import com.yash.stickynotes.security.JwtService;
import com.yash.stickynotes.dto.response.LoginResponse;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public ApiResponse registerUser(SignupRequest request) {

        if(userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ApiResponse(false, "Username already exists");
        }

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new ApiResponse(false, "Email already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .theme("light")
                .build();

        userRepository.save(user);

        return new ApiResponse(true, "User registered successfully");
    }

    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return new LoginResponse(false, "User not found", null);
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse(false, "Invalid password", null);
        }

        String token = jwtService.generateToken(user.getUsername());

        return new LoginResponse(
                true,
                "Login successful",
                token
        );
    }
}