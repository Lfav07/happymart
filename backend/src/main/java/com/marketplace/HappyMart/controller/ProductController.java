package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.service.CategoryServiceImpl;
import com.marketplace.HappyMart.service.interfaces.CategoryService;
import com.marketplace.HappyMart.service.interfaces.ProductService;
import com.marketplace.HappyMart.util.ValidationUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private final ProductService productService;

    @Autowired
    private final CategoryServiceImpl categoryService;

    public ProductController(ProductService productService, CategoryServiceImpl categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/names")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam int categoryId) {

        Category category = new Category();
        category.setId(categoryId);


        List<Product> products = productService.getProductsByCategory(category);

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(products); 
    }


    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product, BindingResult result) {
        if (result.hasErrors()) {
            return ValidationUtil.handleValidationErrors(result);
        }



        String categoryName = product.getCategory().getName();
        Category category = categoryService.createCategoryByName(categoryName)
                .orElseThrow(() -> new RuntimeException("Category could not be created or retrieved"));


        product.setCategory(category);

        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody
    Product updatedProduct, BindingResult result) {
        if (result.hasErrors()) {
            return ValidationUtil.handleValidationErrors(result);
        }

        // Ensure the category is persisted
        Category category = updatedProduct.getCategory();
        if (category != null && category.getId() == 0) {
            categoryService.createCategory(category);
        }

        return productService.updateProduct(id, updatedProduct.getCompany(),
                        updatedProduct.getName(), updatedProduct.getImage(),
                        updatedProduct.getCategory(), updatedProduct.getQuantity(),
                        updatedProduct.getPrice(), updatedProduct.getWeight(), updatedProduct.getDescription())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllProducts() {
        productService.deleteAllProducts();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam(required = false) String keyword,
                                        @RequestParam(required = false) Long categoryId,
                                        @RequestParam(required = false) Integer minPrice,
                                        @RequestParam(required = false) Integer maxPrice) {
        return productService.searchProducts(keyword, categoryId, minPrice, maxPrice);
    }
}
