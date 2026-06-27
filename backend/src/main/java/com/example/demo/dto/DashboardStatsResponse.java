package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsResponse {

    private Long totalProducts;

    private Long totalOrders;

    private Long totalUsers;

    private Double revenue;
}