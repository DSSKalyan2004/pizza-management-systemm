package com.example.Pizza.Pratice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.entity.Pizza;
import com.example.Pizza.Pratice.repository.PizzaRepository;

@Service
public class PizzaService {

    @Autowired
    private PizzaRepository pizzaRepository;


    // ADD PIZZA
    public Pizza addPizza(Pizza pizza) {

        return pizzaRepository.save(pizza);
    }


    // GET ALL PIZZAS
    public List<Pizza> getAllPizzas() {

        return pizzaRepository.findAll();
    }


    // GET PIZZA BY ID
    public Pizza getPizzaById(Integer id) {

        return pizzaRepository.findById(id).orElse(null);
    }


    // UPDATE PIZZA
    public Pizza updatePizza(Integer id, Pizza pizza) {

        Pizza existingPizza =
                pizzaRepository.findById(id).orElse(null);

        if (existingPizza != null) {

            existingPizza.setPizzaName(pizza.getPizzaName());

            existingPizza.setDescription(pizza.getDescription());

            existingPizza.setPrice(pizza.getPrice());

            existingPizza.setSize(pizza.getSize());

            existingPizza.setAvailable(pizza.getAvailable());

            existingPizza.setImageUrl(pizza.getImageUrl());

            return pizzaRepository.save(existingPizza);
        }

        return null;
    }


    // DELETE PIZZA
    public String deletePizza(Integer id) {

        pizzaRepository.deleteById(id);

        return "Pizza Deleted Successfully";
    }
}