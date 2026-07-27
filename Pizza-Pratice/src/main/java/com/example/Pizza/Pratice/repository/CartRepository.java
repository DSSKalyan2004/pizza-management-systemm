package com.example.Pizza.Pratice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Pizza.Pratice.entity.Cart;

public interface CartRepository extends JpaRepository<Cart,Integer>{

    Optional<Cart> findByCustomerCustomerId(Integer customerId);

}