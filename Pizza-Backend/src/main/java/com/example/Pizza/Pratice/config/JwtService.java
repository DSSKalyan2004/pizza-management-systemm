package com.example.Pizza.Pratice.config;

import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.util.JwtUtil;

@Service
public class JwtService {

    public String generateToken(String email){

        return JwtUtil.generateToken(email);

    }

    public String extractEmail(String token){

        return JwtUtil.extractEmail(token);

    }

    public boolean validateToken(String token){

        return JwtUtil.validateToken(token);

    }

}