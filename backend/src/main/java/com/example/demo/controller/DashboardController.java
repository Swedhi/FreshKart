package com.example.demo.controller;

import com.example.demo.dto.DashboardStatsResponse;
import com.example.demo.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.RecentOrderResponse;
import java.util.List;
import com.example.demo.dto.LowStockProductResponse;
import com.example.demo.dto.RevenueChartResponse;
import com.example.demo.dto.InventoryAlertResponse;
import com.example.demo.dto.TopProductResponse;
import com.example.demo.dto.UserProfileResponse;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
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

    System.out.println("TOP PRODUCTS API HIT");

    return dashboardService.getTopProducts();
}
@GetMapping("/profile")
public UserProfileResponse getProfile() {

    System.out.println("PROFILE API HIT");

    return dashboardService.getProfile();
}
}