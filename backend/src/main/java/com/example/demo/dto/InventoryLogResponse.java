package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class InventoryLogResponse {

    private Long id;

    private Long productId;

    private String productName;

    private Integer oldStock;

    private Integer newStock;

    private String action;

    private LocalDateTime createdAt;
}