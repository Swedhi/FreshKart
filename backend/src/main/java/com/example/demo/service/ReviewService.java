package com.example.demo.service;

import com.example.demo.dto.AverageRatingResponse;
import com.example.demo.dto.ReviewResponse;
import com.example.demo.entity.Product;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // Add Review
    public Review addReview(
            Review review
    ) {

        User user =
                userRepository.findById(
                        review.getUser().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        Product product =
                productRepository.findById(
                        review.getProduct().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Product not found"
                        )
                );

        review.setUser(user);
        review.setProduct(product);

        return reviewRepository.save(
                review
        );
    }

    // Get Reviews By Product
    public List<ReviewResponse> getReviewsByProduct(
        Long productId
) {

    return reviewRepository
            .findByProduct_Id(productId)
            .stream()
            .map(review ->
                    new ReviewResponse(
                            review.getId(),
                            review.getUser().getEmail(),
                            review.getRating(),
                            review.getComment()
                    )
            )
            .toList();
}

    // Average Rating
    public AverageRatingResponse getAverageRating(
            Long productId
    ) {

        List<Review> reviews =
                reviewRepository.findByProduct_Id(
                        productId
                );

        double average = 0;

        if (!reviews.isEmpty()) {

            average =
                    reviews.stream()
                            .mapToInt(
                                    Review::getRating
                            )
                            .average()
                            .orElse(0);
        }

        return new AverageRatingResponse(
                productId,
                average
        );
    }
    public void deleteReview(
        Long reviewId
) {

    if (
            !reviewRepository.existsById(
                    reviewId
            )
    ) {

        throw new RuntimeException(
                "Review not found"
        );
    }

    reviewRepository.deleteById(
            reviewId
    );
}
    
}