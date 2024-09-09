package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.OrderItem;

import java.util.List;
import java.util.Optional;

public interface OrderItemService {

    public OrderItem createOrderItem(OrderItem orderItem);
    public List<OrderItem> getAllOrderItems();
    public List<OrderItem> getOrderItemsByOrderId(Long orderId);
}
