package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Cart;
import com.marketplace.HappyMart.model.CartItem;
import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.repository.CartRepository;
import com.marketplace.HappyMart.repository.CartItemRepository;
import com.marketplace.HappyMart.repository.ProductRepository;
import com.marketplace.HappyMart.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
public class CartServiceImplTest {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CartServiceImpl cartService;

    private User user;
    private Cart cart;
    private Product product;
    private CartItem cartItem;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("TestingUser");

        cart = new Cart(user);
        cart.setId(1L);

        product = new Product();
        product.setId(1L);
        product.setPrice(100);

        cartItem = new CartItem();
        cartItem.setId(1L);
        cartItem.setProduct(product);
        cartItem.setCart(cart);
        cartItem.setQuantity(1);
    }

    @Test
    void testCreateCart_UserFound() {
        System.out.println("Running testCreateCart_UserFound");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(cartRepository.findByUserId(1L)).thenReturn(Optional.empty());
        when(cartRepository.save(any(Cart.class))).thenReturn(cart);

        Cart createdCart = cartService.getOrCreateCart(1L);

        System.out.println("Created cart for user: " + createdCart.getUser().getUsername());

        assertNotNull(createdCart);
        assertEquals(1L, createdCart.getUser().getId());
        verify(userRepository, times(1)).findById(1L);
        verify(cartRepository, times(1)).findByUserId(1L);
        verify(cartRepository, times(1)).save(any(Cart.class));
    }


    @Test
    void testAddCartItem() {
        System.out.println("Running testAddCartItem");

        when(cartRepository.findByUserId(1L)).thenReturn(Optional.of(cart));
        product.setPrice(100);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        cartItem.setQuantity(2);
        cartItem.setPrice(product.getPrice() * 2);
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(cartItem);

        CartItem addedCartItem = cartService.addCartItem(1L, 1L, 2);

        System.out.println("Added cart item with quantity: " + addedCartItem.getQuantity() + " and price: " + addedCartItem.getPrice());

        assertNotNull(addedCartItem);
        assertEquals(2, addedCartItem.getQuantity());
        assertEquals(200, addedCartItem.getPrice());
        verify(cartRepository, times(1)).findByUserId(1L);
        verify(productRepository, times(1)).findById(1L);
        verify(cartItemRepository, times(1)).save(any(CartItem.class));
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void testGetCartByUserId() {
        System.out.println("Running testGetCartByUserId");

        when(cartRepository.findByUserId(1L)).thenReturn(Optional.of(cart));

        Optional<Cart> foundCart = cartService.getCartByUserId(1L);

        System.out.println("Found cart with ID: " + foundCart.get().getId());

        assertTrue(foundCart.isPresent());
        assertEquals(1L, foundCart.get().getId());
        verify(cartRepository, times(1)).findByUserId(1L);
    }

    @Test
    void testUpdateCartItemQuantity() {
        System.out.println("Running testUpdateCartItemQuantity");

        when(cartItemRepository.findById(1L)).thenReturn(Optional.of(cartItem));
        when(cartItemRepository.save(cartItem)).thenReturn(cartItem);

        CartItem updatedCartItem = cartService.updateCartItemQuantity(1L, 3);

        System.out.println("Updated cart item quantity to: " + updatedCartItem.getQuantity() + " and price to: " + updatedCartItem.getPrice());

        assertNotNull(updatedCartItem);
        assertEquals(3, updatedCartItem.getQuantity());
        assertEquals(300.0, updatedCartItem.getPrice());

        verify(cartItemRepository, times(1)).findById(1L);
        verify(cartItemRepository, times(1)).save(cartItem);
        verify(cartRepository, times(1)).save(cartItem.getCart());
    }

    @Test
    void testRemoveCartItem() {
        System.out.println("Running testRemoveCartItem");

        when(cartItemRepository.findById(1L)).thenReturn(Optional.of(cartItem));

        cartService.removeCartItem(1L, 1L);

        System.out.println("Removed cart item with ID: " + cartItem.getId());

        verify(cartItemRepository, times(1)).findById(1L);
        verify(cartItemRepository, times(1)).delete(cartItem);
        verify(cartRepository, times(1)).save(cart);
    }

    @Test
    void testClearCart() {
        System.out.println("Running testClearCart");

        when(cartRepository.findByUserId(1L)).thenReturn(Optional.of(cart));

        cartService.clearCartByUserId(1L);

        System.out.println("Cleared all items from the cart");

        assertEquals(0, cart.getItems().size());
        verify(cartRepository, times(1)).save(cart);
    }
}
