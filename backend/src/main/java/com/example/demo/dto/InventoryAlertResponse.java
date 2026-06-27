package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InventoryAlertResponse {

    private Long productId;

    private String productName;

    private Integer stockQuantity;

    private String alertMessage;
}