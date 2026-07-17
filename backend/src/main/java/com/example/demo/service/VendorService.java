package com.example.demo.service;

import com.example.demo.dto.VendorDashboardResponse;
import com.example.demo.dto.VendorResponse;
import com.example.demo.entity.Vendor;
import com.example.demo.repository.OrderItemRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository vendorRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    // =====================================
    // Create Vendor
    // =====================================

    public Vendor create(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    // =====================================
    // Get All Vendors
    // =====================================

    public List<VendorResponse> getAll() {

    return vendorRepository.findAll()
            .stream()
            .map(this::mapToResponse)
            .toList();
}

    // =====================================
    // Get Vendor
    // =====================================

    public Vendor getById(Long id) {

        return vendorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Vendor not found"));
    }

    // =====================================
    // Update Vendor
    // =====================================

    public Vendor update(Long id, Vendor updatedVendor) {

        Vendor vendor = getById(id);

        vendor.setVendorName(updatedVendor.getVendorName());
        vendor.setOwnerName(updatedVendor.getOwnerName());
        vendor.setEmail(updatedVendor.getEmail());
        vendor.setPhone(updatedVendor.getPhone());
        vendor.setAddress(updatedVendor.getAddress());
        vendor.setStatus(updatedVendor.getStatus());

        return vendorRepository.save(vendor);
    }

    // =====================================
    // Delete Vendor
    // =====================================

    public void delete(Long id) {

        vendorRepository.deleteById(id);
    }

    // =====================================
    // Vendor Dashboard
    // =====================================

    public VendorDashboardResponse getDashboard(Long vendorId) {

        Vendor vendor = getById(vendorId);

        Long totalProducts =
                (long) productRepository.findByVendor_Id(vendorId).size();

        Long totalOrders =
                orderItemRepository.countOrdersByVendor(vendorId);

        Double totalRevenue =
                orderItemRepository.getVendorRevenue(vendorId);

        Long lowStockProducts =
                productRepository.findByVendor_Id(vendorId)
                        .stream()
                        .filter(product ->
                                product.getStockQuantity() <= 10)
                        .count();

        return VendorDashboardResponse.builder()
                .vendorId(vendor.getId())
                .vendorName(vendor.getVendorName())
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue)
                .lowStockProducts(lowStockProducts)
                .build();
    }
    // =====================================
// Convert Entity -> DTO
// =====================================

private VendorResponse mapToResponse(Vendor vendor) {

    Long totalProducts =
            (long) productRepository.findByVendor_Id(vendor.getId()).size();

    Long totalOrders =
            orderItemRepository.countOrdersByVendor(vendor.getId());

    Double totalRevenue =
            orderItemRepository.getVendorRevenue(vendor.getId());

    if (totalRevenue == null) {
        totalRevenue = 0.0;
    }

    return VendorResponse.builder()
            .id(vendor.getId())
            .vendorName(vendor.getVendorName())
            .ownerName(vendor.getOwnerName())
            .email(vendor.getEmail())
            .phone(vendor.getPhone())
            .address(vendor.getAddress())
            .status(vendor.getStatus())
            .totalProducts(totalProducts)
            .totalOrders(totalOrders)
            .totalRevenue(totalRevenue)
            .build();
}
}