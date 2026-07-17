package com.example.demo.controller;

import com.example.demo.dto.PaymentRequest;
import com.example.demo.dto.PaymentResponse;
import com.example.demo.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final RazorpayService razorpayService;

    @PostMapping("/create-order")
    public PaymentResponse createOrder(
            @RequestBody PaymentRequest request
    ) throws Exception {

        return razorpayService.createOrder(
                request.getAmount()
        );
    }
}