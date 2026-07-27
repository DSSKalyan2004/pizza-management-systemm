package com.example.Pizza.Pratice.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @OneToOne
    @JoinColumn(name="customer_id")
    private Customer customer;

    @OneToMany(mappedBy="cart",cascade=CascadeType.ALL,orphanRemoval=true)
    private List<CartItem> items=new ArrayList<>();

    private Double totalPrice=0.0;

    public Cart() {
    }

    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

}