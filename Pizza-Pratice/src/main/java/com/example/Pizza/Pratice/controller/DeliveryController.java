package com.example.Pizza.Pratice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Pizza.Pratice.entity.Delivery;
import com.example.Pizza.Pratice.service.DeliveryService;

@RestController
@RequestMapping("/deliveries")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;


    // CREATE DELIVERY
    @PostMapping
    public Delivery createDelivery(

            @RequestParam Integer orderId,

            @RequestParam String deliveryPerson) {

        return deliveryService.createDelivery(
                orderId,
                deliveryPerson
        );
    }


    // GET ALL DELIVERIES
    @GetMapping
    public List<Delivery> getAllDeliveries() {

        return deliveryService.getAllDeliveries();
    }


    // GET DELIVERY BY ID
    @GetMapping("/{id}")
    public Delivery getDeliveryById(
            @PathVariable Integer id) {

        return deliveryService.getDeliveryById(id);
    }


    // UPDATE DELIVERY STATUS
    @PutMapping("/{id}/status")
    public Delivery updateDeliveryStatus(

            @PathVariable Integer id,

            @RequestParam String status) {

        return deliveryService.updateDeliveryStatus(
                id,
                status
        );
    }


    // DELETE DELIVERY
    @DeleteMapping("/{id}")
    public String deleteDelivery(
            @PathVariable Integer id) {

        return deliveryService.deleteDelivery(id);
    }
}