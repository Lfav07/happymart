package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Review;

import java.util.List;

public interface ReviewService {
    public Review createReview(Review review);
    public  List<Review> getAllReviews();
    public Review getReviewByProductId(Long productId);
}
