package com.example.demo.service;

import com.example.demo.dto.OrderDetailResponse;
import com.example.demo.dto.OrderResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.entity.OrderItem;
import com.example.demo.repository.OrderItemRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    // Create Order
    public Order create(Order order) {

        order.setOrderDate(
                LocalDateTime.now()
        );

        return orderRepository.save(order);
    }

    // Get All Orders
    public List<Order> getAll() {

        return orderRepository.findAll();
    }

    // Get Order By Id
    public Order getById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Order not found"
                        )
                );
    }

    // Update Order
    public Order update(
            Long id,
            Order updatedOrder
    ) {

        Order order = getById(id);

        order.setTotalPrice(
                updatedOrder.getTotalPrice()
        );

        order.setOrderDate(
                updatedOrder.getOrderDate()
        );

        return orderRepository.save(order);
    }

    // Delete Order
    @Transactional
    public void delete(Long id) {

        if (!orderRepository.existsById(id)) {

            throw new RuntimeException(
                    "Order not found"
            );
        }

        orderRepository.deleteById(id);
    }

    // Checkout
    @Transactional
public Order checkout(
        Long userId
) {

    User user =
            userRepository.findById(
                    userId
            )
            .orElseThrow(
                    () -> new RuntimeException(
                            "User not found"
                    )
            );

    List<Cart> cartItems =
            cartRepository.findByUser_Id(
                    userId
            );

    if (cartItems.isEmpty()) {

        throw new RuntimeException(
                "Cart is empty"
        );
    }

    double total = 0;

    for (Cart item : cartItems) {

        Product product =
                item.getProduct();

        total +=
                product.getPrice()
                        * item.getQuantity();
    }

    Order order =
            Order.builder()
                    .user(user)
                    .totalPrice(total)
                    .orderDate(
                            java.time.LocalDateTime.now()
                    )
                    .build();

    Order savedOrder =
            orderRepository.save(
                    order
            );

    for (Cart item : cartItems) {

        Product product =
                item.getProduct();

        product.setStockQuantity(
                product.getStockQuantity()
                        - item.getQuantity()
        );

        productRepository.save(
                product
        );

        OrderItem orderItem =
                OrderItem.builder()
                        .order(savedOrder)
                        .product(product)
                        .quantity(
                                item.getQuantity()
                        )
                        .price(
                                product.getPrice()
                        )
                        .build();

        orderItemRepository.save(
                orderItem
        );
    }

    cartRepository.deleteAll(
            cartItems
    );

    return savedOrder;
}
    // GET USER ORDERS
    public List<OrderResponse> getOrdersByUser(
        Long userId
) {

    return orderRepository
            .findByUser_Id(userId)
            .stream()
            .map(order ->
                    new OrderResponse(
                            order.getId(),
                            order.getTotalPrice(),
                            order.getOrderDate()
                    )
            )
            .toList();
}
public List<OrderDetailResponse>
getOrderDetails(
        Long orderId
) {

    return orderItemRepository
            .findByOrder_Id(orderId)
            .stream()
            .map(item ->
                    new OrderDetailResponse(
                            item.getProduct()
                                    .getName(),

                            item.getQuantity(),

                            item.getPrice()
                    )
            )
            .toList();
}
    
}