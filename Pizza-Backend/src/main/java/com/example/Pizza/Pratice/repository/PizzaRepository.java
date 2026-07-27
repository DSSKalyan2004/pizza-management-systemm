package com.example.Pizza.Pratice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Pizza.Pratice.entity.Pizza;

public interface PizzaRepository extends JpaRepository<Pizza, Integer> {

}