package com.marketplace.HappyMart.repository;

import com.marketplace.HappyMart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
