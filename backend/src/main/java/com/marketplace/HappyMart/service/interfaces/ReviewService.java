package com.marketplace.HappyMart.service.interfaces;

import com.marketplace.HappyMart.model.Review;

import java.util.List;

public interface ReviewService {
    public Review createReview(Review review);
    public List<Review> getReviewsByProductId(Long productId);
}
