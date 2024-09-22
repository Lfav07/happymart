package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Cart;
import com.marketplace.HappyMart.model.CartItem;
import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.repository.CartRepository;
import com.marketplace.HappyMart.repository.CartItemRepository;
import com.marketplace.HappyMart.repository.ProductRepository;
import com.marketplace.HappyMart.repository.UserRepository;
import com.marketplace.HappyMart.service.interfaces.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Cart createCart(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));


        if (cartRepository.findByUserId(userId).isPresent()) {
            throw new IllegalStateException("User already has a cart.");
        }


        Cart cart = new Cart(user);


        return cartRepository.save(cart);
    }

    @Override
    public Optional<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public List<CartItem> getAllCartItems(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with ID: " + cartId));
        return cart.getItems();
    }

    @Override
    public CartItem addCartItem(Long cartId, Long productId, int quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with ID: " + cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setPrice(product.getPrice() * quantity);


        cart.getItems().add(cartItem);
        cart.updateTotalPrice();

        return cartItemRepository.save(cartItem);
    }




    @Override
    public Optional<CartItem> getCartItemById(Long cartItemId) {
        return cartItemRepository.findById(cartItemId);
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int newQuantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("CartItem not found with ID: " + cartItemId));

        cartItem.setQuantity(newQuantity);
        cartItem.setPrice(cartItem.getProduct().getPrice() * newQuantity);

        Cart cart = cartItem.getCart();
        cart.updateTotalPrice();

        cartRepository.save(cart);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void removeCartItem(Long cartId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("CartItem not found with ID: " + cartItemId));


        if (!cartItem.getCart().getId().equals(cartId)) {
            throw new IllegalStateException("CartItem does not belong to the Cart with ID: " + cartId);
        }

        Cart cart = cartItem.getCart();
        cart.removeItem(cartItem);
        cartRepository.save(cart);

        cartItemRepository.delete(cartItem);
    }

    @Override
    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found with ID: " + cartId));

        cart.getItems().clear();
        cart.updateTotalPrice();

        cartRepository.save(cart);
    }
}
