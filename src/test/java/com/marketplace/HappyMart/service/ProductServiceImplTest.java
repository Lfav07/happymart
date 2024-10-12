package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Category;
import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.repository.CategoryRepository;
import com.marketplace.HappyMart.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;
    private Category category;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        category = new Category();
        category.setId(1);
        category.setName("Electronics");

        product = new Product();
        product.setId(1L);
        product.setCompany("PhoneCorp");
        product.setName("Smartphone");
        product.setImage("image_url");
        product.setCategory(category);
        product.setQuantity(100);
        product.setPrice(500);
        product.setWeight(200);
        product.setDescription("A high-end smartphone.");
    }

    @Test
    void testCreateProduct_CategoryNotPersisted() {

        when(categoryRepository.findByName(category.getName())).thenReturn(Optional.empty());
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        when(productRepository.save(product)).thenReturn(product);

        System.out.println("Testing creation of product with non-persisted category...");
        Product createdProduct = productService.createProduct(product);

        assertNotNull(createdProduct);
        assertEquals("Smartphone", createdProduct.getName());


        verify(categoryRepository, times(1)).save(any(Category.class));


        verify(productRepository, times(1)).save(product);

        System.out.println("Product created: " + createdProduct);
    }


    @Test
    void testCreateProduct_CategoryAlreadyExists() {

        when(categoryRepository.findByName(category.getName())).thenReturn(Optional.of(category));
        when(productRepository.save(product)).thenReturn(product);

        System.out.println("Testing creation of product with existing category...");
        Product createdProduct = productService.createProduct(product);

        assertNotNull(createdProduct);
        assertEquals("Smartphone", createdProduct.getName());
        verify(categoryRepository, times(0)).save(any());
        verify(productRepository, times(1)).save(product);

        System.out.println("Product created: " + createdProduct);
    }

    @Test
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(List.of(product));

        System.out.println("Retrieving all products...");
        List<Product> products = productService.getAllProducts();

        assertFalse(products.isEmpty());
        assertEquals(1, products.size());
        assertEquals("Smartphone", products.get(0).getName());

        System.out.println("Products retrieved: " + products);
    }

    @Test
    void testGetProductById_Found() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        System.out.println("Testing retrieval of product by ID...");
        Optional<Product> foundProduct = productService.getProductById(1L);

        assertTrue(foundProduct.isPresent());
        assertEquals("Smartphone", foundProduct.get().getName());

        System.out.println("Product found: " + foundProduct.get());
    }

    @Test
    void testGetProductById_NotFound() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        System.out.println("Testing retrieval of product by ID when not found...");
        Optional<Product> foundProduct = productService.getProductById(1L);

        assertFalse(foundProduct.isPresent());
        System.out.println("No product found with the given ID.");
    }

    @Test
    void testDeleteProductById_Found() {
        when(productRepository.existsById(1L)).thenReturn(true);
        doNothing().when(productRepository).deleteById(1L);

        System.out.println("Testing deletion of product by ID...");
        productService.deleteProductById(1L);

        verify(productRepository, times(1)).deleteById(1L);
        System.out.println("Product with ID 1 deleted.");
    }

    @Test
    void testDeleteProductById_NotFound() {
        when(productRepository.existsById(1L)).thenReturn(false);

        System.out.println("Testing deletion of product by ID when not found...");
        Exception exception = assertThrows(RuntimeException.class, () -> {
            productService.deleteProductById(1L);
        });

        String expectedMessage = "Product not found";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
        System.out.println("Expected exception occurred: " + actualMessage);
    }
}
