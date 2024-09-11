package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.repository.ProductRepository;
import com.marketplace.HappyMart.service.interfaces.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    public Optional<Product> updateProduct(Long id, String company, String name, String image,
                                 Category category, int quantity, int price,
                                 int weight, String description) {
        return  productRepository.findById(id)
                        .map(product -> {


                            product.setCompany(company);
                            product.setName(name);
                            product.setImage(image);
                            product.setCategory(category);
                            product.setQuantity(quantity);
                            product.setPrice(price);
                            product.setWeight(weight);
                            product.setDescription(description);

                            return productRepository.save(product);
                        });
    }

    @Override
    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    @Transactional
    public void deleteProductById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> searchProducts(String keyword, Long categoryId, Integer minPrice, Integer maxPrice) {
        return productRepository.searchProducts(keyword, categoryId, minPrice, maxPrice);
    }
}
