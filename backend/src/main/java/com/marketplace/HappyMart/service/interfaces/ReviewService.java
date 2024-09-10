package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    public Review createReview(Review review);
    public  List<Review> getAllReviews();
    public Optional<Review> getReviewByProductId(Long productId);
    public void deleteReviewById(Long id);
}
