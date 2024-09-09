package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.repository.CategoryRepository;
import com.marketplace.HappyMart.service.interfaces.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);

    }

    @Override
    @Transactional
    public Optional<Category> updateCategory(Long id, String name) {
        return  categoryRepository.findById(id)
                        .map(category -> {
        category.setName(name);
        return categoryRepository.save(category);
                        });
    }

    @Override
    @Transactional
    public void deleteCategoryById(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public void deleteAllCategories() {
        categoryRepository.deleteAll();
    }
}
