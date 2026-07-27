package com.example.Pizza.Pratice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.config.JwtService;
import com.example.Pizza.Pratice.dto.AuthResponse;
import com.example.Pizza.Pratice.dto.LoginRequest;
import com.example.Pizza.Pratice.dto.RegisterRequest;
import com.example.Pizza.Pratice.entity.Customer;
import com.example.Pizza.Pratice.entity.Role;
import com.example.Pizza.Pratice.exception.DuplicateResourceException;
import com.example.Pizza.Pratice.repository.CustomerRepository;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request) {

    	if(customerRepository.existsByEmail(request.getEmail())){
    	    throw new DuplicateResourceException("Email already exists");
    	}
        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setRole(Role.CUSTOMER);

        customerRepository.save(customer);

        return "Registration Successful";
    }

    public AuthResponse login(LoginRequest request) {

        Optional<Customer> optionalCustomer =
                customerRepository.findByEmail(request.getEmail());

        if(optionalCustomer.isEmpty()) {

            return new AuthResponse(null,"Invalid Email",null);

        }

        Customer customer = optionalCustomer.get();

        if(!passwordEncoder.matches(request.getPassword(),
                customer.getPassword())) {

            return new AuthResponse(null,"Invalid Password",null);

        }

        String token = jwtService.generateToken(customer.getEmail());

        return new AuthResponse(token,
                "Login Successful",
                customer.getRole().name());

    }

}