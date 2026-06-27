package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LowStockProductResponse {

    private Long id;

    private String name;

    private Integer stockQuantity;
}