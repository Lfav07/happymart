package com.marketplace.HappyMart.controller;

import com.marketplace.HappyMart.model.Review;
import com.marketplace.HappyMart.service.interfaces.ReviewService;
import com.marketplace.HappyMart.util.ValidationUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

public class ReviewController {

    @Autowired
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }
    @GetMapping
    public List<Review> getAllReviews() {
        return  reviewService.getAllReviews();
    }

    @PostMapping
    public ResponseEntity<?> createReview(@Valid Review review, BindingResult result) {
        if (result.hasErrors()) {
            return ValidationUtil.handleValidationErrors(result);
        }
        Review createdReview =  reviewService.createReview(review);
        return  ResponseEntity.ok(createdReview);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return  reviewService.getReviewByProductId(id)
                .map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Void> deleteReviewById(@PathVariable Long id) {
        reviewService.deleteReviewById(id);
        return ResponseEntity.ok().build();
    }



}
