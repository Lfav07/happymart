package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.dto.CartItemRequest;
import com.marketplace.HappyMart.model.Cart;
import com.marketplace.HappyMart.model.CartItem;
import com.marketplace.HappyMart.service.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users/{userId}/cart")
public class CartController {

    @Autowired
    private CartService cartService;


    @GetMapping
    public ResponseEntity<Cart> getOrCreateCart(@PathVariable Long userId) {
        Cart cart = cartService.getOrCreateCart(userId);
        return ResponseEntity.ok(cart);
    }


    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getAllCartItems(@PathVariable Long userId) {
        List<CartItem> cartItems = cartService.getAllCartItemsByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/items")
    public ResponseEntity<CartItem> addCartItem(@PathVariable Long userId,
                                                @RequestBody CartItemRequest cartItemRequest) {
        CartItem cartItem = cartService.addCartItem(userId, cartItemRequest.getProductId(), cartItemRequest.getQuantity());
        return ResponseEntity.ok(cartItem);
    }



    @GetMapping("/items/{cartItemId}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long userId,
                                                    @PathVariable Long cartItemId) {
        Optional<CartItem> cartItem = cartService.getCartItemById(cartItemId);
        return cartItem.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemQuantity(@PathVariable Long userId,
                                                           @PathVariable Long cartItemId,
                                                           @RequestParam int newQuantity) {
        CartItem updatedCartItem = cartService.updateCartItemQuantity(cartItemId, newQuantity);
        return ResponseEntity.ok(updatedCartItem);
    }


    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long userId,
                                               @PathVariable Long cartItemId) {
        cartService.removeCartItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/items")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCartByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}
