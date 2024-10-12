package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public Product createProduct(Product product);

    public List<Product> getAllProducts();

    List<Product> getProductsByCategory(Category category);

    public Optional<Product> getProductById(Long id);

    public Optional<Product> updateProduct(Long id, String company, String name, String image,
                                           Category category, int quantity, double price,
                                           int weight, String description);

    public void deleteProductById(Long id);

    public void deleteAllProducts();

    List<Product> searchProducts(String keyword, Long categoryId, Integer minPrice, Integer maxPrice);

}
