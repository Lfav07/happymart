package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public Product createProduct(Product product);

    public List<Product> getAllProducts();

    public Optional<Product> getProductById(Long id);

    public Optional<Product> updateProduct(Long id, String company, String name, String image,
                                           Category category, int quantity, int price,
                                           int weight, String description);

    public void deleteProductById(Long id);

    public void deleteAllProducts();

}
