package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.model.OrderStatus;
import com.marketplace.HappyMart.repository.OrderRepository;
import com.marketplace.HappyMart.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public Order updateOrder(Long id, Long userId, int totalAmount) {
       Order order =  orderRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Order not found"));
       order.setUserId(id);
       order.setTotalAmount(totalAmount);
       return orderRepository.save(order);
    }

    @Override
    public Order updateOrderStatus(Long id, OrderStatus orderStatus) {
        Order order =  orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(orderStatus);
        return  orderRepository.save(order);
    }

    @Override
    public void deleteOrderById(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
    orderRepository.deleteById(id);
    }

    @Override
    public void deleteAllOrders() {
     orderRepository.deleteAll();
    }
}
