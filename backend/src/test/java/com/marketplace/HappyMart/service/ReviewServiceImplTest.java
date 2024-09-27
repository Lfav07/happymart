package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Product;
import com.marketplace.HappyMart.model.Review;
import com.marketplace.HappyMart.model.User;
import com.marketplace.HappyMart.repository.ProductRepository;
import com.marketplace.HappyMart.repository.ReviewRepository;
import com.marketplace.HappyMart.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceImplTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    private Review review;
    private User user;
    private Product product;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("TestingUser");

        product = new Product();
        product.setId(1L);
        product.setPrice(100);

        review = new Review();
        review.setId(1L);
        review.setUser(user);
        review.setProduct(product);
        review.setRating(5);
        review.setComment("Test");
    }

    @Test
    void createReview() {
        when(reviewRepository.save(any(Review.class))).thenReturn(review);

        Review savedReview = reviewService.createReview(review);

        assertNotNull(savedReview);
        assertEquals(review.getId(), savedReview.getId());
        assertEquals(review.getComment(), savedReview.getComment());
        verify(reviewRepository, times(1)).save(review);

        System.out.println("Created review: " + savedReview);
    }

    @Test
    void getAllReviews() {
        List<Review> reviews = Arrays.asList(review);
        when(reviewRepository.findAll()).thenReturn(reviews);

        List<Review> fetchedReviews = reviewService.getAllReviews();

        assertNotNull(fetchedReviews);
        assertEquals(1, fetchedReviews.size());
        verify(reviewRepository, times(1)).findAll();

        System.out.println("Fetched all reviews: " + fetchedReviews);
    }

    @Test
    void getReviewByProductId() {
        Long productId = 1L;
        when(reviewRepository.findById(productId)).thenReturn(Optional.of(review));

        Optional<Review> fetchedReview = reviewService.getReviewByProductId(productId);

        assertTrue(fetchedReview.isPresent());
        assertEquals(review.getId(), fetchedReview.get().getId());
        verify(reviewRepository, times(1)).findById(productId);

        System.out.println("Fetched review by product ID: " + fetchedReview.get());
    }

    @Test
    void deleteReviewById() {
        Long reviewId = 1L;
        when(reviewRepository.existsById(reviewId)).thenReturn(true);
        doNothing().when(reviewRepository).deleteById(reviewId);

        reviewService.deleteReviewById(reviewId);

        verify(reviewRepository, times(1)).existsById(reviewId);
        verify(reviewRepository, times(1)).deleteById(reviewId);

        System.out.println("Deleted review with ID: " + reviewId);
    }

    @Test
    void deleteReviewById_NotFound() {
        Long reviewId = 1L;
        when(reviewRepository.existsById(reviewId)).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> reviewService.deleteReviewById(reviewId));
        assertEquals("Review not found", exception.getMessage());
        verify(reviewRepository, times(1)).existsById(reviewId);
        verify(reviewRepository, times(0)).deleteById(reviewId);

        System.out.println("Attempted to delete review with ID: " + reviewId + " but review was not found.");
    }
}
