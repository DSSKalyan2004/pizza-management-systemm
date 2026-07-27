package com.example.Pizza.Pratice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Pizza.Pratice.entity.Customer;
import com.example.Pizza.Pratice.service.CustomerService;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerService customerService;


    // ADD CUSTOMER
    @PostMapping
    public Customer addCustomer(
            @RequestBody Customer customer) {

        return customerService.addCustomer(customer);
    }


    // GET ALL CUSTOMERS
    @GetMapping
    public List<Customer> getAllCustomers() {

        return customerService.getAllCustomers();
    }


    // GET CUSTOMER BY ID
    @GetMapping("/{id}")
    public Customer getCustomerById(
            @PathVariable Integer id) {

        return customerService.getCustomerById(id);
    }


    // UPDATE CUSTOMER
    @PutMapping("/{id}")
    public Customer updateCustomer(
            @PathVariable Integer id,
            @RequestBody Customer customer) {

        return customerService.updateCustomer(id, customer);
    }


    // DELETE CUSTOMER
    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Integer id) {

        return customerService.deleteCustomer(id);
    }
}