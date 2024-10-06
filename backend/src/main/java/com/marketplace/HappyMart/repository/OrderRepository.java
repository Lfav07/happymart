package com.marketplace.HappyMart.repository;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Order;
import com.marketplace.HappyMart.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserIdAndStatus(Long userId, OrderStatus status);
    List<Order> findByUserId(Long userId);
}
