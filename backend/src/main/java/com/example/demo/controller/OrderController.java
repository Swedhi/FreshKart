package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.OrderResponse;
import com.example.demo.dto.OrderTrackingResponse;
import com.example.demo.dto.OrderDetailResponse;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public Order createOrder(
            @RequestBody Order order
    ) {

        return orderService.create(order);

    }

    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAll();

    }

    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id
    ) {

        return orderService.getById(id);

    }

    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order
    ) {

        return orderService.update(id, order);

    }

    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id
    ) {

        orderService.delete(id);

        return "Order deleted successfully";

    }

    @PostMapping("/checkout/{userId}")
    public Order checkout(
            @PathVariable Long userId
    ) {

        return orderService.checkout(
                userId
        );

    }

    @GetMapping("/user/{userId}")
public List<OrderResponse> getOrdersByUser(
        @PathVariable Long userId
) {

    return orderService.getOrdersByUser(
            userId
    );
}
@GetMapping("/{orderId}/items")
public List<OrderDetailResponse>
getOrderItems(
        @PathVariable Long orderId
) {

    return orderService
            .getOrderDetails(
                    orderId
            );
}
@PatchMapping("/{id}/status")
public Order updateStatus(
        @PathVariable Long id,
        @RequestParam String status
) {

    return orderService.updateStatus(id, status);

}
@GetMapping("/{id}/tracking")
public OrderTrackingResponse getTracking(
        @PathVariable Long id
) {

    return orderService.getTracking(id);

}
}