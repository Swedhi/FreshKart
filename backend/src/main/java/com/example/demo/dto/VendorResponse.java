package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendorResponse {

    private Long id;

    private String vendorName;

    private String ownerName;

    private String email;

    private String phone;

    private String address;

    private String status;

    private Long totalProducts;

    private Long totalOrders;

    private Double totalRevenue;
}