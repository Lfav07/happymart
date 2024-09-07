package com.marketplace.HappyMart.repository;

import com.marketplace.HappyMart.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
