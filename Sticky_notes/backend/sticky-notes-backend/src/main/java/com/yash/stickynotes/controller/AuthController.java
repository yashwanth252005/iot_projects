package com.yash.stickynotes.controller;

import com.yash.stickynotes.dto.response.ApiResponse;
import com.yash.stickynotes.dto.request.SignupRequest;
import com.yash.stickynotes.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.yash.stickynotes.dto.request.LoginRequest;
import org.springframework.http.ResponseEntity;
import com.yash.stickynotes.dto.response.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ApiResponse signup(@Valid @RequestBody SignupRequest request) {
        return authService.registerUser(request);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.loginUser(request)
        );
    }

}