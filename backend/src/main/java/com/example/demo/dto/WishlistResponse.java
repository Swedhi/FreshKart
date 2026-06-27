package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WishlistResponse {

    private Long wishlistId;

    private Long productId;

    private String productName;

    private String category;

    private Double price;

    private String imageUrl;
}