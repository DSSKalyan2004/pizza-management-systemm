package com.example.Pizza.Pratice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.entity.Customer;
import com.example.Pizza.Pratice.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;


    // ADD CUSTOMER
    public Customer addCustomer(Customer customer) {

        return customerRepository.save(customer);
    }


    // GET ALL CUSTOMERS
    public List<Customer> getAllCustomers() {

        return customerRepository.findAll();
    }


    // GET CUSTOMER BY ID
    public Customer getCustomerById(Integer id) {

        return customerRepository
                .findById(id)
                .orElse(null);
    }


    // UPDATE CUSTOMER
    public Customer updateCustomer(
            Integer id,
            Customer customer) {

        Customer existingCustomer =
                customerRepository
                        .findById(id)
                        .orElse(null);

        if (existingCustomer != null) {

            existingCustomer.setName(customer.getName());

            existingCustomer.setEmail(customer.getEmail());

            existingCustomer.setPhone(customer.getPhone());

            existingCustomer.setAddress(customer.getAddress());

            return customerRepository.save(existingCustomer);
        }

        return null;
    }


    // DELETE CUSTOMER
    public String deleteCustomer(Integer id) {

        customerRepository.deleteById(id);

        return "Customer Deleted Successfully";
    }
}