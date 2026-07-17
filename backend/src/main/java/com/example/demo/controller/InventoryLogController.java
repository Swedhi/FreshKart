package com.example.demo.controller;

import com.example.demo.dto.InventoryLogResponse;
import com.example.demo.service.InventoryLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory-logs")
@RequiredArgsConstructor
public class InventoryLogController {

    private final InventoryLogService inventoryLogService;

    @GetMapping
    public List<InventoryLogResponse> getAllLogs() {
        return inventoryLogService.getAllLogs();
    }

}