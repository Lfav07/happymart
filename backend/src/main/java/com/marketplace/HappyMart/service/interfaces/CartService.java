package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Cart;
import com.marketplace.HappyMart.model.CartItem;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CartService {


    Cart getOrCreateCart(Long userId);

    Set<CartItem> getAllCartItemsByUserId(Long userId);


    public Optional<Cart> getCartByUserId(Long userId);


    public List<CartItem> getAllCartItems(Long cartId);


    public CartItem addCartItem(Long cartId, Long productId, int quantity);


    public Optional<CartItem> getCartItemById(Long cartItemId);


    public CartItem updateCartItemQuantity(Long cartItemId, int newQuantity);


    public void removeCartItem(Long cartId, Long cartItemId);

    public void clearCart(Long cartId);

    void clearCartByUserId(Long userId);
}
