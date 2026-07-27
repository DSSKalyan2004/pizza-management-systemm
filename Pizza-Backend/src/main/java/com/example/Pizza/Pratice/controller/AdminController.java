package com.example.Pizza.Pratice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Pizza.Pratice.dto.AdminDashboardResponse;
import com.example.Pizza.Pratice.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {

        return adminService.getDashboard();

    }

}