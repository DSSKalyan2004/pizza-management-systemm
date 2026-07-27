package com.example.Pizza.Pratice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Pizza.Pratice.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}