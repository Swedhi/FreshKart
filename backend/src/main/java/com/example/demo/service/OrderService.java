package com.example.demo.service;

import com.example.demo.dto.OrderDetailResponse;
import com.example.demo.dto.OrderResponse;
import com.example.demo.dto.OrderTrackingResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    

    // =====================================
    // Create Order
    // =====================================

    public Order create(Order order) {

        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // =====================================
    // Get All Orders
    // =====================================

    public List<Order> getAll() {

        return orderRepository.findAll();
    }

    // =====================================
    // Get Order By Id
    // =====================================

    public Order getById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }

    // =====================================
    // Update Order
    // =====================================

    public Order update(Long id, Order updatedOrder) {

        Order order = getById(id);

        order.setTotalPrice(updatedOrder.getTotalPrice());
        order.setOrderDate(updatedOrder.getOrderDate());
        order.setStatus(updatedOrder.getStatus());
        order.setPaymentMethod(updatedOrder.getPaymentMethod());
        order.setPaymentStatus(updatedOrder.getPaymentStatus());

        return orderRepository.save(order);
    }

    // =====================================
    // Delete Order
    // =====================================

    @Transactional
    public void delete(Long id) {

        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }

        orderRepository.deleteById(id);
    }

    // =====================================
    // Checkout
    // =====================================

    @Transactional
    public Order checkout(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Cart> cartItems = cartRepository.findByUser_Id(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = 0;

        for (Cart cart : cartItems) {

            total += cart.getProduct().getPrice()
                    * cart.getQuantity();
        }

        Order order = Order.builder()
                .user(user)
                .totalPrice(total)
                .orderDate(LocalDateTime.now())
                .status("Pending")
                .paymentMethod("COD")
                .paymentStatus("Pending")
                .build();

        Order savedOrder = orderRepository.save(order);

        for (Cart cart : cartItems) {

            Product product = cart.getProduct();

            product.setStockQuantity(
                    product.getStockQuantity()
                            - cart.getQuantity());

            productRepository.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .product(product)
                    .quantity(cart.getQuantity())
                    .price(product.getPrice())
                    .build();

            orderItemRepository.save(orderItem);
        }

        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    // =====================================
    // User Orders
    // =====================================

    public List<OrderResponse> getOrdersByUser(Long userId) {

        return orderRepository.findByUser_Id(userId)
                .stream()
                .map(order ->
                        new OrderResponse(
                                order.getId(),
                                order.getTotalPrice(),
                                order.getOrderDate()
                        ))
                .toList();
    }

    // =====================================
    // Order Details
    // =====================================

    public List<OrderDetailResponse> getOrderDetails(Long orderId) {

        return orderItemRepository.findByOrder_Id(orderId)
                .stream()
                .map(item ->
                        new OrderDetailResponse(
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getPrice()
                        ))
                .toList();
    }

    // =====================================
    // Update Status
    // =====================================

    public Order updateStatus(Long id, String status) {

        Order order = getById(id);

        order.setStatus(status);

        return orderRepository.save(order);
    }
    // =====================================
// Order Tracking
// =====================================

public OrderTrackingResponse getTracking(Long orderId) {

    Order order = getById(orderId);

    String estimatedDelivery;

    switch (order.getStatus()) {

        case "Pending":
            estimatedDelivery = "40 mins";
            break;

        case "Confirmed":
            estimatedDelivery = "30 mins";
            break;

        case "Packed":
            estimatedDelivery = "20 mins";
            break;

        case "Out For Delivery":
            estimatedDelivery = "10 mins";
            break;

        case "Delivered":
            estimatedDelivery = "Delivered";
            break;

        case "Cancelled":
            estimatedDelivery = "Cancelled";
            break;

        default:
            estimatedDelivery = "--";
    }

    return new OrderTrackingResponse(
            order.getId(),
            order.getStatus(),
            estimatedDelivery,
            "Rahul Sharma",
            "9876543210"
    );

}

    // =====================================
    // Vendor Orders
    // =====================================

    public List<OrderItem> getOrdersByVendor(Long vendorId) {

        return orderItemRepository.findAll()
                .stream()
                .filter(item ->
                        item.getProduct() != null
                                && item.getProduct().getVendor() != null
                                && item.getProduct()
                                      .getVendor()
                                      .getId()
                                      .equals(vendorId))
                .toList();
    }

    // =====================================
    // Vendor Revenue
    // =====================================

    public Double getVendorRevenue(Long vendorId) {

        return getOrdersByVendor(vendorId)
                .stream()
                .mapToDouble(item ->
                        item.getPrice()
                                * item.getQuantity())
                .sum();
    }

    // =====================================
    // Vendor Total Orders
    // =====================================

    public Long getVendorOrderCount(Long vendorId) {

        return (long) getOrdersByVendor(vendorId).size();
    }
        


}