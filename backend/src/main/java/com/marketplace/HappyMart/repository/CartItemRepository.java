package com.marketplace.HappyMart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.marketplace.HappyMart.model.CartItem;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCartId(Long cartId);
}
