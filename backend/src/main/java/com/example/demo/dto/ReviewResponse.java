package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewResponse {

    private Long reviewId;

    private String userEmail;

    private Integer rating;

    private String comment;
}