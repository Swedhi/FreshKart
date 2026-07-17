package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String category;

    private Double price;

    private Integer stockQuantity;

    private String imageUrl;

    private Long vendorId;

    private String vendorName;
}