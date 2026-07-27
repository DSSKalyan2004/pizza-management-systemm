package com.example.Pizza.Pratice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.dto.AdminDashboardResponse;
import com.example.Pizza.Pratice.repository.CustomerRepository;
import com.example.Pizza.Pratice.repository.OrderRepository;
import com.example.Pizza.Pratice.repository.PaymentRepository;
import com.example.Pizza.Pratice.repository.PizzaRepository;

@Service
public class AdminService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PizzaRepository pizzaRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public AdminDashboardResponse getDashboard() {

        AdminDashboardResponse response = new AdminDashboardResponse();

        response.setTotalCustomers(customerRepository.count());
        response.setTotalPizzas(pizzaRepository.count());
        response.setTotalOrders(orderRepository.count());
        response.setTotalPayments(paymentRepository.count());
        response.setTotalRevenue(paymentRepository.getTotalRevenue());

        return response;
    }

}