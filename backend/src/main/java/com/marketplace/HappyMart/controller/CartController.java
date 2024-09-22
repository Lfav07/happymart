package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.model.Cart;
import com.marketplace.HappyMart.model.CartItem;
import com.marketplace.HappyMart.service.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<Cart> createCart(@RequestParam Long userId) {
        Cart cart = cartService.createCart(userId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<Cart>> getCartByUserId(@PathVariable Long userId) {
        Optional<Cart> cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/{cartId}/items")
    public ResponseEntity<List<CartItem>> getAllCartItems(@PathVariable Long cartId) {
        List<CartItem> cartItems = cartService.getAllCartItems(cartId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<CartItem> addCartItem(@PathVariable Long cartId,
                                                @RequestParam Long productId,
                                                @RequestParam int quantity) {

        Optional<Cart> cart = cartService.getCartByUserId(cartId);
        if (cart.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        CartItem cartItem = cartService.addCartItem(cartId, productId, quantity);
        return ResponseEntity.ok(cartItem);
    }

    @GetMapping("/items/{cartItemId}")
    public ResponseEntity<Optional<CartItem>> getCartItemById(@PathVariable Long cartItemId) {
        Optional<CartItem> cartItem = cartService.getCartItemById(cartItemId);
        return ResponseEntity.ok(cartItem);
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemQuantity(@PathVariable Long cartItemId,
                                                           @RequestParam int newQuantity) {
        CartItem updatedCartItem = cartService.updateCartItemQuantity(cartItemId, newQuantity);
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("/{cartId}/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartId,
                                               @PathVariable Long cartItemId) {
        cartService.removeCartItem(cartId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }
}
