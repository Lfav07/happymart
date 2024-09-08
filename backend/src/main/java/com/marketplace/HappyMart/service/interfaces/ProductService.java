package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;

import java.util.List;

public interface ProductService {

    public Product createProduct(Product product);
    public List<Product> getAllProducts();
    public Product getProductById(Long id);
    public Product updateProduct(Long id, String company, String name, String image,
                                 Category category, int quantity, int price,
                                 int weight, String description);
    public void deleteProduct(Long id);

}
