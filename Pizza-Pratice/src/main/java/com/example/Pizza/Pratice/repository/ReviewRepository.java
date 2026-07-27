package com.example.Pizza.Pratice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Pizza.Pratice.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByPizzaPizzaId(Integer pizzaId);

}