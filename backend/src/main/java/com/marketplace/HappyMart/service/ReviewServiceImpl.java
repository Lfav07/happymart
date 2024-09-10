package com.marketplace.HappyMart.service;

import com.marketplace.HappyMart.model.Review;
import com.marketplace.HappyMart.repository.ReviewRepository;
import com.marketplace.HappyMart.service.interfaces.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> getReviewByProductId(Long productId) {
       return reviewRepository.findById(productId);
    }

    @Override
    public void deleteReviewById(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found");
        }
         reviewRepository.deleteById(id);
    }
}
