package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.repository.CategoryRepository;
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

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Product createProduct(Product product) {

        String categoryName = product.getCategory().getName();
        Optional<Category> existingCategoryOpt = categoryRepository.findByName(categoryName);


        Category category;
        if (existingCategoryOpt.isPresent()) {
            category = existingCategoryOpt.get();
        } else {
            category = new Category();
            category.setName(categoryName);
            category = categoryRepository.save(category);
        }


        product.setCategory(category);
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(Category category) {
        return productRepository.getProductsByCategory(category);
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Product> updateProduct(Long id, String company, String name, String image,
                                           Category category, int quantity, double price,
                                           int weight, String description) {
        return productRepository.findById(id)
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

    @Override
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
