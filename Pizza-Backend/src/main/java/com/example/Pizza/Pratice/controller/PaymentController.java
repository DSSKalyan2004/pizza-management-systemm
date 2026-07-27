package com.example.Pizza.Pratice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Pizza.Pratice.dto.PaymentRequest;
import com.example.Pizza.Pratice.service.PaymentService;

@RestController
@RequestMapping("/payments")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/pay")
    public String pay(@RequestBody PaymentRequest request){

        return paymentService.makePayment(request);

    }

}