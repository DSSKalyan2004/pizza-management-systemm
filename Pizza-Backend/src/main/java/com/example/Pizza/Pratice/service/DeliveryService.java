package com.example.Pizza.Pratice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.entity.Delivery;
import com.example.Pizza.Pratice.entity.Order;
import com.example.Pizza.Pratice.repository.DeliveryRepository;
import com.example.Pizza.Pratice.repository.OrderRepository;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderRepository orderRepository;


    // CREATE DELIVERY
    public Delivery createDelivery(
            Integer orderId,
            String deliveryPerson) {

        // Find Order
        Order order =
                orderRepository.findById(orderId).orElse(null);

        // Check Order
        if (order == null) {
            return null;
        }

        // Create Delivery Object
        Delivery delivery = new Delivery();

        // Set Order
        delivery.setOrder(order);

        // Get Address From Customer
        delivery.setDeliveryAddress(
                order.getCustomer().getAddress()
        );

        // Set Delivery Person
        delivery.setDeliveryPerson(deliveryPerson);

        // Set Default Status
        delivery.setDeliveryStatus("PREPARING");

        // Save Delivery
        return deliveryRepository.save(delivery);
    }


    // GET ALL DELIVERIES
    public List<Delivery> getAllDeliveries() {

        return deliveryRepository.findAll();
    }


    // GET DELIVERY BY ID
    public Delivery getDeliveryById(Integer id) {

        return deliveryRepository
                .findById(id)
                .orElse(null);
    }


    // UPDATE DELIVERY STATUS
    public Delivery updateDeliveryStatus(
            Integer id,
            String status) {

        Delivery delivery =
                deliveryRepository
                        .findById(id)
                        .orElse(null);

        if (delivery != null) {

            delivery.setDeliveryStatus(status);

            return deliveryRepository.save(delivery);
        }

        return null;
    }


    // DELETE DELIVERY
    public String deleteDelivery(Integer id) {

        deliveryRepository.deleteById(id);

        return "Delivery Deleted Successfully";
    }
}