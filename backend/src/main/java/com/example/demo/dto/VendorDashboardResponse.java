package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorDashboardResponse {

    private Long vendorId;

    private String vendorName;

    private Long totalProducts;

    private Long totalOrders;

    private Double totalRevenue;

    private Long lowStockProducts;

}