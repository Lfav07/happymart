package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.model.OrderStatus;
import com.marketplace.HappyMart.repository.OrderRepository;
import com.marketplace.HappyMart.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderItemServiceImpl orderItemService;

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
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getOrderByStatus(Long userId, OrderStatus status) {
        return orderRepository.findByUserIdAndStatus(userId, status);
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public Optional<Order> updateOrder(Long id, Long userId, double totalAmount) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setUserId(id);
                    order.setTotalAmount(totalAmount);
                    return orderRepository.save(order);
                });
    }

    @Override
    public Optional<Order> updateOrderStatus(Long id, OrderStatus orderStatus) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(orderStatus);
                    return orderRepository.save(order);
                });
    }

    @Override
    public void deleteOrderById(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderItemService.deleteByOrderId(id);

        orderRepository.deleteById(id);
    }

    @Override
    public void deleteAllOrders() {
        orderRepository.deleteAll();
    }
}
