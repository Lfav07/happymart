package com.marketplace.HappyMart.controller;


import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.service.interfaces.ProductService;
import com.marketplace.HappyMart.util.ValidationUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
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
}
