package com.example.Pizza.Pratice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.dto.CartRequest;
import com.example.Pizza.Pratice.entity.Cart;
import com.example.Pizza.Pratice.entity.CartItem;
import com.example.Pizza.Pratice.entity.Customer;
import com.example.Pizza.Pratice.entity.Pizza;
import com.example.Pizza.Pratice.repository.CartItemRepository;
import com.example.Pizza.Pratice.repository.CartRepository;
import com.example.Pizza.Pratice.repository.CustomerRepository;
import com.example.Pizza.Pratice.repository.PizzaRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PizzaRepository pizzaRepository;

    public String addToCart(CartRequest request) {

        Customer customer = customerRepository
                .findById(request.getCustomerId())
                .orElseThrow();

        Pizza pizza = pizzaRepository
                .findById(request.getPizzaId())
                .orElseThrow();

        Cart cart;

        Optional<Cart> optionalCart =
                cartRepository.findByCustomerCustomerId(customer.getCustomerId());

        if(optionalCart.isPresent()) {

            cart = optionalCart.get();

        } else {

            cart = new Cart();
            cart.setCustomer(customer);
            cart = cartRepository.save(cart);

        }

        // If this pizza is already in the cart, bump its quantity
        // instead of creating a duplicate line item.
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getPizza().getPizzaId().equals(pizza.getPizzaId()))
                .findFirst()
                .orElse(null);

        if (item != null) {

            item.setQuantity(item.getQuantity() + request.getQuantity());
            item.setSubTotal(pizza.getPrice() * item.getQuantity());

        } else {

            item = new CartItem();

            item.setCart(cart);
            item.setPizza(pizza);
            item.setQuantity(request.getQuantity());
            item.setSubTotal(pizza.getPrice() * request.getQuantity());

            cart.getItems().add(item);
        }

        cartItemRepository.save(item);

        recalcTotal(cart);

        return "Pizza Added To Cart";

    }

    public Cart viewCart(Integer customerId) {

        return cartRepository
                .findByCustomerCustomerId(customerId)
                .orElseThrow();

    }

    // UPDATE ITEM QUANTITY
    public Cart updateItemQuantity(Integer customerId, Integer cartItemId, Integer quantity) {

        Cart cart = cartRepository
                .findByCustomerCustomerId(customerId)
                .orElseThrow();

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow();

        if (quantity <= 0) {

            cart.getItems().remove(item);

        } else {

            item.setQuantity(quantity);
            item.setSubTotal(item.getPizza().getPrice() * quantity);
            cartItemRepository.save(item);
        }

        recalcTotal(cart);

        return cart;
    }

    // REMOVE A SINGLE ITEM
    public Cart removeItem(Integer customerId, Integer cartItemId) {

        Cart cart = cartRepository
                .findByCustomerCustomerId(customerId)
                .orElseThrow();

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow();

        cart.getItems().remove(item);

        recalcTotal(cart);

        return cart;
    }

    public String clearCart(Integer customerId) {

        Cart cart = cartRepository
                .findByCustomerCustomerId(customerId)
                .orElseThrow();

        cart.getItems().clear();

        cart.setTotalPrice(0.0);

        cartRepository.save(cart);

        return "Cart Cleared";

    }

    private void recalcTotal(Cart cart) {

        double total = 0;

        for (CartItem i : cart.getItems()) {
            total += i.getSubTotal();
        }

        cart.setTotalPrice(total);

        cartRepository.save(cart);
    }

}