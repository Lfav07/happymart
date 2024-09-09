package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.model.OrderStatus;
import com.marketplace.HappyMart.repository.OrderRepository;
import com.marketplace.HappyMart.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

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
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public Optional<Order> updateOrder(Long id, Long userId, int totalAmount) {
       return orderRepository.findById(id)
               .map(order -> {
                   order.setUserId(id);
                   order.setTotalAmount(totalAmount);
                   return  orderRepository.save(order);
               });
    }

    @Override
    public Optional<Order> updateOrderStatus(Long id, OrderStatus orderStatus) {
        return  orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(orderStatus);
                    return  orderRepository.save(order);
                });
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
