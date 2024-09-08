package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Category;

import java.util.List;

public interface CategoryService {
    public Category createCategory(Category category);
    public List<Category> getAllCategories();
    public Category getCategoryById(Long id);
    public Category updateCategory(Long id, String name);
    public void deleteCategoryById(Long id);
    public void deleteAllCategories();
}
