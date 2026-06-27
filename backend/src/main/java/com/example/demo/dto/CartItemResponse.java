package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CartItemResponse {

    private Long cartId;

    private Long productId;

    private String productName;

    private Double price;

    private Integer quantity;

    private Double subtotal;
}