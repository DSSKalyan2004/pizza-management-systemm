package com.example.Pizza.Pratice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deliveryId;

    @OneToOne
    private Order order;

    private String deliveryAddress;

    private String deliveryPerson;

    private String deliveryStatus;

    public Delivery() {
    }

    public Delivery(Integer deliveryId, Order order,
                    String deliveryAddress,
                    String deliveryPerson,
                    String deliveryStatus) {

        this.deliveryId = deliveryId;
        this.order = order;
        this.deliveryAddress = deliveryAddress;
        this.deliveryPerson = deliveryPerson;
        this.deliveryStatus = deliveryStatus;
    }

    public Integer getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(Integer deliveryId) {
        this.deliveryId = deliveryId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getDeliveryPerson() {
        return deliveryPerson;
    }

    public void setDeliveryPerson(String deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }

    public String getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(String deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }
}