package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderTrackingResponse {

    private Long orderId;

    private String status;

    private String estimatedDelivery;

    private String deliveryPartner;

    private String phone;

}