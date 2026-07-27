package com.example.Pizza.Pratice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.dto.PaymentRequest;
import com.example.Pizza.Pratice.entity.Order;
import com.example.Pizza.Pratice.entity.Payment;
import com.example.Pizza.Pratice.repository.OrderRepository;
import com.example.Pizza.Pratice.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    public String makePayment(PaymentRequest request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow();

        Payment payment = new Payment();

        payment.setOrder(order);
        payment.setAmount(order.getTotalPrice());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS");

        paymentRepository.save(payment);

        return "Payment Successful";

    }

}