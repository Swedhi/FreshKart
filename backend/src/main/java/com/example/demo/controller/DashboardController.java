package com.example.demo.controller;

import com.example.demo.dto.DashboardStatsResponse;
import com.example.demo.dto.InventoryAlertResponse;
import com.example.demo.dto.LowStockProductResponse;
import com.example.demo.dto.RecentOrderResponse;
import com.example.demo.dto.RevenueChartResponse;
import com.example.demo.dto.TopProductResponse;
import com.example.demo.dto.UserProfileResponse;
import com.example.demo.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {
        return dashboardService.getStats();
    }

    @GetMapping("/recent-orders")
    public List<RecentOrderResponse> getRecentOrders() {
        return dashboardService.getRecentOrders();
    }

    @GetMapping("/low-stock")
    public List<LowStockProductResponse> getLowStockProducts() {
        return dashboardService.getLowStockProducts();
    }

    @GetMapping("/revenue-chart")
    public List<RevenueChartResponse> getRevenueChart() {
        return dashboardService.getRevenueChart();
    }

    @GetMapping("/inventory-alerts")
    public List<InventoryAlertResponse> getInventoryAlerts() {
        return dashboardService.getInventoryAlerts();
    }

    @GetMapping("/top-products")
    public List<TopProductResponse> getTopProducts() {
        return dashboardService.getTopProducts();
    }

    @GetMapping("/profile")
    public UserProfileResponse getProfile() {
        return dashboardService.getProfile();
    }

   
}