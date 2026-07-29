package com.example.Pizza.Pratice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Pizza.Pratice.entity.Order;
import com.example.Pizza.Pratice.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;


    // PLACE ORDER

    @PostMapping
    public Order placeOrder(

            @RequestParam Integer customerId,

            @RequestParam Integer pizzaId,

            @RequestParam Integer quantity) {

        return orderService.placeOrder(
                customerId,
                pizzaId,
                quantity
        );
    }


    // GET ALL ORDERS

    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }


    // GET ORDER BY ID

    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Integer id) {

        return orderService.getOrderById(id);
    }


    // DELETE ORDER

    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Integer id) {

        return orderService.deleteOrder(id);
    }
}