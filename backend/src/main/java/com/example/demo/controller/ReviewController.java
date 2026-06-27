package com.example.demo.controller;

import com.example.demo.dto.AverageRatingResponse;
import com.example.demo.dto.ReviewResponse;
import com.example.demo.entity.Review;
import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // Add Review
    @PostMapping
    public Review addReview(
            @RequestBody Review review
    ) {

        return reviewService.addReview(
                review
        );
    }

    // Get Product Reviews
    @GetMapping("/product/{productId}")
    public List<ReviewResponse> getReviews(
            @PathVariable Long productId
    ) {

        return reviewService.getReviewsByProduct(
                productId
        );
    }

    // Get Average Rating
    @GetMapping("/product/{productId}/average")
    public AverageRatingResponse getAverageRating(
            @PathVariable Long productId
    ) {

        return reviewService.getAverageRating(
                productId
        );
    }
    @DeleteMapping("/{reviewId}")
public String deleteReview(
        @PathVariable Long reviewId
) {

    reviewService.deleteReview(
            reviewId
    );

    return "Review deleted successfully";
}
    
}