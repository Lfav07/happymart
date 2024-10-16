package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.*;
import com.marketplace.HappyMart.service.interfaces.CartService;
import com.marketplace.HappyMart.service.interfaces.CheckoutService;
import com.marketplace.HappyMart.service.interfaces.OrderItemService;
import com.marketplace.HappyMart.service.interfaces.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Override
    public Order checkout(Long cartId) {
        Cart cart = cartService.getCartByUserId(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with ID: " + cartId));

        Order order = new Order();
        order.setUserId(cart.getUser().getId());
        order.setTotalAmount(cart.getTotalPrice());
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderService.createOrder(order);

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());

            orderItemService.createOrderItem(orderItem);
        }

        cartService.clearCart(cartId);

        return savedOrder;
    }
}
