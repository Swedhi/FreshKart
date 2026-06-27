package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplyCouponResponse {

    private Double originalAmount;

    private Double discount;

    private Double finalAmount;
}