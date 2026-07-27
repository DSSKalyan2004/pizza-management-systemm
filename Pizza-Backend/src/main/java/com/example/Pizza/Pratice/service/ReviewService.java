package com.example.Pizza.Pratice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.dto.ReviewRequest;
import com.example.Pizza.Pratice.entity.Customer;
import com.example.Pizza.Pratice.entity.Pizza;
import com.example.Pizza.Pratice.entity.Review;
import com.example.Pizza.Pratice.repository.CustomerRepository;
import com.example.Pizza.Pratice.repository.PizzaRepository;
import com.example.Pizza.Pratice.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PizzaRepository pizzaRepository;

    public String addReview(ReviewRequest request) {

        Customer customer = customerRepository
                .findById(request.getCustomerId())
                .orElseThrow();

        Pizza pizza = pizzaRepository
                .findById(request.getPizzaId())
                .orElseThrow();

        Review review = new Review();

        review.setCustomer(customer);
        review.setPizza(pizza);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        reviewRepository.save(review);

        return "Review Added Successfully";
    }

    public List<Review> getReviews(Integer pizzaId) {

        return reviewRepository.findByPizzaPizzaId(pizzaId);

    }

}