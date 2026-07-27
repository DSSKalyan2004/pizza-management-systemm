package com.example.Pizza.Pratice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Pizza.Pratice.dto.ReviewRequest;
import com.example.Pizza.Pratice.entity.Review;
import com.example.Pizza.Pratice.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public String addReview(@RequestBody ReviewRequest request) {

        return reviewService.addReview(request);

    }

    @GetMapping("/pizza/{pizzaId}")
    public List<Review> getReviews(@PathVariable Integer pizzaId) {

        return reviewService.getReviews(pizzaId);

    }

}