package com.example.demo.controller;

import com.example.demo.dto.ApplyCouponRequest;
import com.example.demo.dto.ApplyCouponResponse;
import com.example.demo.entity.Coupon;
import com.example.demo.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    // Create Coupon
    @PostMapping
    public Coupon createCoupon(
            @RequestBody Coupon coupon
    ) {

        return couponService.createCoupon(
                coupon
        );
    }

    // Get All Coupons
    @GetMapping
    public List<Coupon> getAllCoupons() {

        return couponService.getAllCoupons();
    }

    // Apply Coupon
    @PostMapping("/apply")
    public ApplyCouponResponse applyCoupon(
            @RequestBody ApplyCouponRequest request
    ) {

        return couponService.applyCoupon(
                request
        );
    }
}