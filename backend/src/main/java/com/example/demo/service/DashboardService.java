package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    /*
     * =====================================
     * Dashboard Statistics
     * =====================================
     */

    public DashboardStatsResponse getStats() {

        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();
        long totalUsers = userRepository.count();

        double revenue = orderRepository.findAll()
                .stream()
                .filter(order -> order.getTotalPrice() != null)
                .mapToDouble(Order::getTotalPrice)
                .sum();

        return new DashboardStatsResponse(
                totalProducts,
                totalOrders,
                totalUsers,
                revenue
        );
    }

    /*
     * =====================================
     * Recent Orders
     * =====================================
     */

    public List<RecentOrderResponse> getRecentOrders() {

        return orderRepository
                .findTop5ByOrderByOrderDateDesc()
                .stream()
                .map(order -> new RecentOrderResponse(
                        order.getId(),
                        order.getUser() != null
                                ? order.getUser().getEmail()
                                : "Guest",
                        order.getTotalPrice() != null
                                ? order.getTotalPrice()
                                : 0.0,
                        order.getOrderDate()
                ))
                .collect(Collectors.toList());
    }

    /*
     * =====================================
     * Low Stock Products
     * =====================================
     */

    public List<LowStockProductResponse> getLowStockProducts() {

        return productRepository
                .findByStockQuantityLessThan(20)
                .stream()
                .map(product -> new LowStockProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getStockQuantity()
                ))
                .collect(Collectors.toList());
    }

    /*
     * =====================================
     * Revenue Chart
     * =====================================
     */

    public List<RevenueChartResponse> getRevenueChart() {

        List<RevenueChartResponse> chart = new ArrayList<>();

        int year = LocalDateTime.now().getYear();

        for (int month = 1; month <= 12; month++) {

            LocalDateTime start = LocalDateTime.of(
                    year,
                    month,
                    1,
                    0,
                    0
            );

            LocalDateTime end = start.plusMonths(1);

            List<Order> orders =
                    orderRepository.findByOrderDateBetween(start, end);

            double revenue = orders.stream()
                    .filter(order -> order.getTotalPrice() != null)
                    .mapToDouble(Order::getTotalPrice)
                    .sum();

            chart.add(
                    new RevenueChartResponse(
                            start.getMonth().name().substring(0, 3),
                            revenue
                    )
            );
        }

        return chart;
    }

    /*
     * =====================================
     * Inventory Alerts
     * =====================================
     */

    public List<InventoryAlertResponse> getInventoryAlerts() {

        return productRepository
                .findByStockQuantityLessThanEqual(10)
                .stream()
                .map(product -> new InventoryAlertResponse(
                        product.getId(),
                        product.getName(),
                        product.getStockQuantity(),
                        "Low Stock"
                ))
                .collect(Collectors.toList());
    }

    /*
     * =====================================
     * Top Products
     * =====================================
     */

    public List<TopProductResponse> getTopProducts() {

        return productRepository
                .findAllByOrderByStockQuantityDesc(PageRequest.of(0, 5))
                .stream()
                .map(product -> new TopProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getStockQuantity(),
                        product.getPrice()
                ))
                .collect(Collectors.toList());
    }

    /*
     * =====================================
     * Logged In User Profile
     * =====================================
     */

    public UserProfileResponse getProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return new UserProfileResponse(
                user.getId(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
}