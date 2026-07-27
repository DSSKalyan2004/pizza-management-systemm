package com.example.Pizza.Pratice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Pizza.Pratice.entity.Delivery;

public interface DeliveryRepository
        extends JpaRepository<Delivery, Integer> {

}