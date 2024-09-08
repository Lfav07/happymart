package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.model.OrderStatus;

import java.util.List;

public interface OrderService {

    public Order createOrder(Order order);
    public List<Order> getAllOrders();
    public Order getOrderById(Long id);
    public Order updateOrder(Long id, Long userId, int totalAmount, OrderStatus status);
    public void deleteOrderById(Long id);
    public void deleteAllOrders();
}
