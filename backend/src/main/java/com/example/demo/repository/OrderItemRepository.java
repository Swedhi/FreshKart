package com.example.demo.repository;

import com.example.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {

    // =====================================
    // Order Details
    // =====================================

    List<OrderItem> findByOrder_Id(Long orderId);

    // =====================================
    // Vendor Orders Count
    // =====================================

    @Query("""
        SELECT COUNT(oi)
        FROM OrderItem oi
        WHERE oi.product.vendor.id = :vendorId
    """)
    Long countOrdersByVendor(Long vendorId);

    // =====================================
    // Vendor Revenue
    // =====================================

    @Query("""
        SELECT COALESCE(SUM(oi.quantity * oi.price),0)
        FROM OrderItem oi
        WHERE oi.product.vendor.id = :vendorId
    """)
    Double getVendorRevenue(Long vendorId);

    // =====================================
    // Vendor Order Items
    // =====================================

    List<OrderItem> findByProduct_Vendor_Id(Long vendorId);

}