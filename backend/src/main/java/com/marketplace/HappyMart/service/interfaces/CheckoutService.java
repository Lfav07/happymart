package com.marketplace.HappyMart.service.interfaces;
import com.marketplace.HappyMart.model.Order;

public interface CheckoutService {
    Order checkout(Long cartId);
}
