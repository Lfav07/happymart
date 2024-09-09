package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.model.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    public Order createOrder(Order order);
    public List<Order> getAllOrders();
    public Optional<Order> getOrderById(Long id);
    public Optional<Order> updateOrder(Long id, Long userId, int totalAmount);
    public Optional <Order> updateOrderStatus(Long id, OrderStatus orderStatus);
    public void deleteOrderById(Long id);
    public void deleteAllOrders();
}
