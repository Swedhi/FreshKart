package com.example.demo.service;

import com.example.demo.dto.ApplyCouponRequest;
import com.example.demo.dto.ApplyCouponResponse;
import com.example.demo.entity.Coupon;
import com.example.demo.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    // Create Coupon
    public Coupon createCoupon(
            Coupon coupon
    ) {

        return couponRepository.save(
                coupon
        );
    }

    // Get All Coupons
    public List<Coupon> getAllCoupons() {

        return couponRepository.findAll();
    }

    // Apply Coupon
    public ApplyCouponResponse applyCoupon(
            ApplyCouponRequest request
    ) {

        Coupon coupon =
                couponRepository.findByCode(
                        request.getCouponCode()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Coupon not found"
                        )
                );

        if (!coupon.getActive()) {

            throw new RuntimeException(
                    "Coupon is inactive"
            );
        }

        double discount =
                request.getAmount()
                        * coupon.getDiscountPercentage()
                        / 100;

        double finalAmount =
                request.getAmount()
                        - discount;

        return new ApplyCouponResponse(
                request.getAmount(),
                discount,
                finalAmount
        );
    }
}