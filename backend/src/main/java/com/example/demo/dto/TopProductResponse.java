package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TopProductResponse {

    private Long id;

    private String name;

    private Integer stockQuantity;

    private Double price;
}