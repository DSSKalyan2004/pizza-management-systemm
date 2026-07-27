package com.example.Pizza.Pratice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Pizza.Pratice.dto.CartRequest;
import com.example.Pizza.Pratice.entity.Cart;
import com.example.Pizza.Pratice.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public String addToCart(@RequestBody CartRequest request){

        return cartService.addToCart(request);

    }

    @GetMapping("/{customerId}")

    public Cart viewCart(@PathVariable Integer customerId){

        return cartService.viewCart(customerId);

    }

    @PutMapping("/{customerId}/item/{cartItemId}")
    public Cart updateItemQuantity(
            @PathVariable Integer customerId,
            @PathVariable Integer cartItemId,
            @RequestParam Integer quantity){

        return cartService.updateItemQuantity(customerId, cartItemId, quantity);

    }

    @DeleteMapping("/{customerId}/item/{cartItemId}")
    public Cart removeItem(
            @PathVariable Integer customerId,
            @PathVariable Integer cartItemId){

        return cartService.removeItem(customerId, cartItemId);

    }

    @DeleteMapping("/clear/{customerId}")

    public String clearCart(@PathVariable Integer customerId){

        return cartService.clearCart(customerId);

    }

}