package com.example.demo.dto;

import lombok.Data;

@Data
public class ApplyCouponRequest {

    private String couponCode;

    private Double amount;
}