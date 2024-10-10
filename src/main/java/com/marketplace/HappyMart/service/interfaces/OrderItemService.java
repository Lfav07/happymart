package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.OrderItem;

import java.util.List;

public interface OrderItemService {

    public OrderItem createOrderItem(OrderItem orderItem);

    public List<OrderItem> getAllOrderItems();

    public List<OrderItem> getOrderItemsByOrderId(Long orderId);
}
