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

import com.example.Pizza.Pratice.entity.Pizza;
import com.example.Pizza.Pratice.service.PizzaService;

@RestController
@RequestMapping("/pizzas")
@CrossOrigin(origins = "http://localhost:5173")
public class PizzaController {

    @Autowired
    private PizzaService pizzaService;


    // ADD PIZZA
    @PostMapping
    public Pizza addPizza(@RequestBody Pizza pizza) {

        return pizzaService.addPizza(pizza);
    }


    // GET ALL PIZZAS
    @GetMapping
    public List<Pizza> getAllPizzas() {

        return pizzaService.getAllPizzas();
    }


    // GET PIZZA BY ID
    @GetMapping("/{id}")
    public Pizza getPizzaById(@PathVariable Integer id) {

        return pizzaService.getPizzaById(id);
    }


    // UPDATE PIZZA
    @PutMapping("/{id}")
    public Pizza updatePizza(
            @PathVariable Integer id,
            @RequestBody Pizza pizza) {

        return pizzaService.updatePizza(id, pizza);
    }


    // DELETE PIZZA
    @DeleteMapping("/{id}")
    public String deletePizza(@PathVariable Integer id) {

        return pizzaService.deletePizza(id);
    }
}