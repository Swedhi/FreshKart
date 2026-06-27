package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OrderResponse {

    private Long id;

    private Double totalPrice;

    private LocalDateTime orderDate;
}