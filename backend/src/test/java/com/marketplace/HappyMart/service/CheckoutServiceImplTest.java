package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.*;
import com.marketplace.HappyMart.repository.CartRepository;
import com.marketplace.HappyMart.service.interfaces.CartService;
import com.marketplace.HappyMart.service.interfaces.CheckoutService;
import com.marketplace.HappyMart.service.interfaces.OrderItemService;
import com.marketplace.HappyMart.service.interfaces.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CheckoutServiceImplTest {

    @Mock
    private CartService cartService;

    @Mock
    private OrderService orderService;

    @Mock
    private OrderItemService orderItemService;

    @InjectMocks
    private CheckoutServiceImpl checkoutService;

    private Cart cart;
    private CartItem cartItem;
    private Product product;
    private User user;
    private Order order;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);

        product = new Product();
        product.setId(1);
        product.setPrice(100);

        cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(2);
        cartItem.setPrice(200);

        cart = new Cart();
        cart.setId(1L);
        cart.setUser(user);
        cart.setItems(Collections.singletonList(cartItem));
        order = new Order();
        order.setUserId(user.getId());
        order.setTotalAmount(cart.getTotalPrice());
        order.setStatus(OrderStatus.PENDING);
    }

    @Test
    void checkout_successful() {
        // Mocking the dependencies
        when(cartService.getCartByUserId(cart.getId())).thenReturn(Optional.of(cart));
        when(orderService.createOrder(any(Order.class))).thenReturn(order);

        // Act
        Order savedOrder = checkoutService.checkout(cart.getId());

        // Assert
        assertNotNull(savedOrder);
        assertEquals(cart.getUser().getId(), savedOrder.getUserId());
        assertEquals(cart.getTotalPrice(), savedOrder.getTotalAmount());
        verify(orderService, times(1)).createOrder(any(Order.class));
        verify(orderItemService, times(1)).createOrderItem(any(OrderItem.class));
        verify(cartService, times(1)).clearCart(cart.getId());

        // Print result
        System.out.println("Checkout completed successfully: " + savedOrder);
    }

    @Test
    void checkout_cartNotFound() {
        // Mocking cart not found scenario
        when(cartService.getCartByUserId(cart.getId())).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            checkoutService.checkout(cart.getId());
        });

        assertEquals("Cart not found with ID: " + cart.getId(), exception.getMessage());
        verify(orderService, times(0)).createOrder(any(Order.class));
        verify(orderItemService, times(0)).createOrderItem(any(OrderItem.class));
        verify(cartService, times(0)).clearCart(cart.getId());

        // Print result
        System.out.println("Checkout failed: " + exception.getMessage());
    }
}
