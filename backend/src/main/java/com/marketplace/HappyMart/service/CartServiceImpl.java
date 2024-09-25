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
    public Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        return cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(new Cart(user)));
    }

    @Override
    public List<CartItem> getAllCartItemsByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for User ID: " + userId));
        return cart.getItems();
    }


    @Override
    public Optional<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public List<CartItem> getAllCartItems(Long cartId) {
        return  cartItemRepository.findAll();
    }

    @Override
    public CartItem addCartItem(Long userId, Long productId, int quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for User ID: " + userId));


        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));


        Optional<CartItem> existingCartItemOpt = cart.getItems().stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst();

        if (existingCartItemOpt.isPresent()) {

            CartItem existingCartItem = existingCartItemOpt.get();
            return updateCartItemQuantity(existingCartItem.getId(), existingCartItem.getQuantity() + quantity);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setPrice(product.getPrice() * quantity);


            cart.getItems().add(cartItem);


            cart.updateTotalPrice();
            cartRepository.save(cart);

            return cartItemRepository.save(cartItem);
        }
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
    public void removeCartItem(Long userId, Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("CartItem not found with ID: " + cartItemId));

        if (!cartItem.getCart().getUser().getId().equals(userId)) {
            throw new IllegalStateException("CartItem does not belong to the User with ID: " + userId);
        }

        Cart cart = cartItem.getCart();
        cart.removeItem(cartItem);
        cartRepository.save(cart);
        cartItemRepository.delete(cartItem);
    }

    @Override
    public void clearCart(Long cartId) {

    }

    @Override
    public void clearCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for User ID: " + userId));

        cart.getItems().clear();
        cart.updateTotalPrice();
        cartRepository.save(cart);
    }
}
