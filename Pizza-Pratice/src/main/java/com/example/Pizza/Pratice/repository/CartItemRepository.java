package com.example.Pizza.Pratice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Pizza.Pratice.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem,Integer>{

}