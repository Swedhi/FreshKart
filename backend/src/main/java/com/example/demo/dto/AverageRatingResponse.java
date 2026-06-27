package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AverageRatingResponse {

    private Long productId;

    private Double averageRating;
}