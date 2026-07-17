package com.example.demo.controller;

import com.example.demo.entity.Vendor;
import com.example.demo.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.VendorDashboardResponse;
import com.example.demo.dto.VendorResponse;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    @PostMapping
    public Vendor createVendor(
            @RequestBody Vendor vendor
    ) {
        return vendorService.create(vendor);
    }

    @GetMapping
public List<VendorResponse> getAllVendors() {
    return vendorService.getAll();
}

    @GetMapping("/{id}")
    public Vendor getVendor(
            @PathVariable Long id
    ) {
        return vendorService.getById(id);
    }

    @PutMapping("/{id}")
    public Vendor updateVendor(
            @PathVariable Long id,
            @RequestBody Vendor vendor
    ) {
        return vendorService.update(id, vendor);
    }

    @DeleteMapping("/{id}")
    public String deleteVendor(
            @PathVariable Long id
    ) {

        vendorService.delete(id);

        return "Vendor deleted successfully";
    }
    // =====================================
// Vendor Dashboard
// =====================================

@GetMapping("/{vendorId}/dashboard")
public VendorDashboardResponse getVendorDashboard(
        @PathVariable Long vendorId
) {

    return vendorService.getDashboard(vendorId);

}
}