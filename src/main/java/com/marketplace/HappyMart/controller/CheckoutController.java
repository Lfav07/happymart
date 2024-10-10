package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.service.CheckoutServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutServiceImpl checkoutService;

    @PostMapping("/{cartId}")
    public ResponseEntity<Order> checkout(@PathVariable Long cartId) {
        try {
            Order order = checkoutService.checkout(cartId);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
