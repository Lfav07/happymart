package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.*;
import com.marketplace.HappyMart.repository.*;
import com.marketplace.HappyMart.service.interfaces.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(MockitoExtension.class)
public class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderItemServiceImpl orderItemService;

    @InjectMocks
    private OrderServiceImpl orderService;

    private Order order;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setId(1L);
        user.setUsername("Test");

        order = new Order();
        order.setId(1L);
        order.setUserId(1L);
        order.setStatus(OrderStatus.PENDING);
    }

    @Test
    void createOrder() {
        System.out.println("Running test: createOrder");
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        Order createdOrder = orderService.createOrder(order);

        System.out.println("Created Order: " + createdOrder);
        assertNotNull(createdOrder);
        assertEquals(1L, createdOrder.getUserId());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void getAllOrders() {
        System.out.println("Running test: getAllOrders");
        when(orderRepository.findAll()).thenReturn(List.of(order));

        List<Order> orders = orderService.getAllOrders();

        System.out.println("Retrieved Orders: " + orders);
        assertFalse(orders.isEmpty());
        assertEquals(1, orders.size());
    }

    @Test
    void getOrderById() {
        System.out.println("Running test: getOrderById");
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        Optional<Order> foundOrder = orderService.getOrderById(1L);

        System.out.println("Found Order: " + foundOrder.orElse(null));
        assertTrue(foundOrder.isPresent());
        assertEquals(1L, foundOrder.get().getId());

        verify(orderRepository, times(1)).findById(1L);
    }

    @Test
    void updateOrder() {
        System.out.println("Running test: updateOrder");
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);

        Optional<Order> updatedOrder = orderService.updateOrder(1L, 1L, 300);

        System.out.println("Updated Order: " + updatedOrder.orElse(null));
        assertNotNull(updatedOrder);
        assertEquals(1L, updatedOrder.get().getUserId());
        assertEquals(300, updatedOrder.get().getTotalAmount());

        verify(orderRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void updateOrderStatus() {
        System.out.println("Running test: updateOrderStatus");
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);

        Optional<Order> toUpdate = orderService.updateOrderStatus(1L, OrderStatus.COMPLETED);

        System.out.println("Updated Order Status: " + toUpdate.orElse(null));
        assertNotNull(toUpdate);
        assertEquals(OrderStatus.COMPLETED, toUpdate.get().getStatus());

        verify(orderRepository, times(1)).findById(1L);
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void deleteOrderById() {
        System.out.println("Running test: deleteOrderById");
        when(orderRepository.existsById(1L)).thenReturn(true);
        doNothing().when(orderRepository).deleteById(1L);

        orderService.deleteOrderById(1L);

        System.out.println("Order with ID 1L deleted");
        verify(orderRepository, times(1)).deleteById(1L);
    }
}
