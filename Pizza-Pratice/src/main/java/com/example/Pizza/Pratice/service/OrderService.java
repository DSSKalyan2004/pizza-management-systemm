package com.example.Pizza.Pratice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Pizza.Pratice.entity.Customer;
import com.example.Pizza.Pratice.entity.Order;
import com.example.Pizza.Pratice.entity.Pizza;
import com.example.Pizza.Pratice.repository.CustomerRepository;
import com.example.Pizza.Pratice.repository.OrderRepository;
import com.example.Pizza.Pratice.repository.PizzaRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PizzaRepository pizzaRepository;


    // PLACE ORDER
    public Order placeOrder(
            Integer customerId,
            Integer pizzaId,
            Integer quantity) {

        Customer customer =
                customerRepository.findById(customerId).orElse(null);

        Pizza pizza =
                pizzaRepository.findById(pizzaId).orElse(null);


        if (customer == null || pizza == null) {
            return null;
        }


        Order order = new Order();

        order.setCustomer(customer);

        order.setPizza(pizza);

        order.setQuantity(quantity);


        // CALCULATE TOTAL PRICE

        Double totalPrice =
                pizza.getPrice() * quantity;

        order.setTotalPrice(totalPrice);


        // DEFAULT ORDER STATUS

        order.setOrderStatus("ORDER PLACED");


        return orderRepository.save(order);
    }


    // GET ALL ORDERS

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // GET ORDER BY ID

    public Order getOrderById(Integer id) {

        return orderRepository
                .findById(id)
                .orElse(null);
    }


    // DELETE ORDER

    public String deleteOrder(Integer id) {

        orderRepository.deleteById(id);

        return "Order Deleted Successfully";
    }
}