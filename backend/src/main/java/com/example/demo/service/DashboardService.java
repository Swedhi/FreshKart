package com.example.demo.service;

import com.example.demo.dto.DashboardStatsResponse;
import com.example.demo.dto.LowStockProductResponse;
import com.example.demo.dto.RecentOrderResponse;
import com.example.demo.dto.RevenueChartResponse;
import com.example.demo.entity.Order;
import com.example.demo.repository.FarmRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import com.example.demo.dto.InventoryAlertResponse;
import com.example.demo.dto.TopProductResponse;
import org.springframework.data.domain.PageRequest;
import com.example.demo.dto.UserProfileResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.data.jpa.repository.Query;


@Service
@RequiredArgsConstructor
public class DashboardService {

    private final FarmRepository farmRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public DashboardStatsResponse getStats() {

    long totalFarms = farmRepository.count();

    long totalProducts = productRepository.count();

    long totalOrders = orderRepository.count();

    double totalRevenue =
            orderRepository.findAll()
                    .stream()
                    .mapToDouble(Order::getTotalPrice)
                    .sum();

    return new DashboardStatsResponse(
            totalFarms,
            totalProducts,
            totalOrders,
            totalRevenue
    );
}

    public List<RecentOrderResponse> getRecentOrders() {

        return orderRepository
                .findTop5ByOrderByOrderDateDesc()
                .stream()
                .map(order -> new RecentOrderResponse(
                        order.getId(),
                        order.getUser().getEmail(),
                        
                        order.getTotalPrice(),
                        order.getOrderDate()
                ))
                .collect(Collectors.toList());
    }
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
public List<RevenueChartResponse> getRevenueChart() {

    List<RevenueChartResponse> response =
            new ArrayList<>();

    int currentYear =
            LocalDateTime.now().getYear();

    for (int month = 1; month <= 12; month++) {

        LocalDateTime start =
                LocalDateTime.of(
                        currentYear,
                        month,
                        1,
                        0,
                        0
                );

        LocalDateTime end =
                start.plusMonths(1);

        double revenue =
                orderRepository
                        .findByOrderDateBetween(
                                start,
                                end
                        )
                        .stream()
                        .mapToDouble(
                                Order::getTotalPrice
                        )
                        .sum();

        response.add(
                new RevenueChartResponse(
                        Month.of(month)
                                .name()
                                .substring(0, 3),
                        revenue
                )
        );
    }

    return response;
}
public List<InventoryAlertResponse> getInventoryAlerts() {

    return productRepository
            .findByStockQuantityLessThanEqual(10)
            .stream()
            .map(product ->
                    new InventoryAlertResponse(
                            product.getId(),
                            product.getName(),
                            product.getStockQuantity(),
                            "Low stock alert"
                    )
            )
            .toList();
}
public List<TopProductResponse> getTopProducts() {

    return productRepository
            .findAllByOrderByStockQuantityDesc(
                    PageRequest.of(0, 5)
            )
            .stream()
            .map(product -> new TopProductResponse(
                    product.getId(),
                    product.getName(),
                    product.getStockQuantity(),
                    product.getPrice()
            ))
            .toList();
}
public UserProfileResponse getProfile() {

    System.out.println("STEP 1");

    Authentication authentication =
            SecurityContextHolder
                    .getContext()
                    .getAuthentication();

    System.out.println("STEP 2");

    String email = authentication.getName();

    System.out.println("EMAIL = " + email);

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException(
                            "User not found"
                    ));

    System.out.println("STEP 3");

    return new UserProfileResponse(
            user.getId(),
            user.getEmail(),
            user.getCreatedAt()
    );
}


}