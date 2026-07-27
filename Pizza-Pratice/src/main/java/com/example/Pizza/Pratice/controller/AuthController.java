package com.example.Pizza.Pratice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Pizza.Pratice.dto.AuthResponse;
import com.example.Pizza.Pratice.dto.LoginRequest;
import com.example.Pizza.Pratice.dto.RegisterRequest;
import com.example.Pizza.Pratice.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){

        return authService.register(request);

    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){

        return authService.login(request);

    }

}