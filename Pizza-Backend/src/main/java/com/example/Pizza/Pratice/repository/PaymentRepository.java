package com.example.Pizza.Pratice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Pizza.Pratice.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Integer>{

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p")
    Double getTotalRevenue();

}