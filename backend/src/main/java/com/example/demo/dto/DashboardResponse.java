package com.example.demo.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Double totalRevenue;

    private Long totalOrders;

    private Long totalProducts;

    private Long totalCustomers;

    private List<?> recentOrders;

    private List<?> lowStockProducts;
}