package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RecentOrderResponse {

    private Long id;

    private String userEmail;

    private Double totalPrice;

    private LocalDateTime orderDate;
}