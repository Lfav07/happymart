package com.marketplace.HappyMart.controller;


import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.service.interfaces.CategoryService;
import com.marketplace.HappyMart.util.ValidationUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private  final CategoryService categoryService;


    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return  categoryService.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<?> addCategory(@Valid @RequestBody Category category, BindingResult result) {
        if (result.hasErrors()) {
            return ValidationUtil.handleValidationErrors(result);
        }
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(createdCategory);
    }
    @GetMapping("/{id}")
    public  ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return  categoryService.getCategoryById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid
    @RequestBody Category updatedcategory, BindingResult result) {
        if (result.hasErrors()) {
            return ValidationUtil.handleValidationErrors(result);
        }
        return categoryService.updateCategory(id, updatedcategory.getName())
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategoryById(id);
        return ResponseEntity.ok().build();
    }



}
