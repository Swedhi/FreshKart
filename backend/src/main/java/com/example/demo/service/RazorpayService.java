package com.example.demo.service;

import com.example.demo.dto.PaymentResponse;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RazorpayService {

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key.id}")
    private String keyId;

    public PaymentResponse createOrder(Double amount) {

        try {

            if (amount == null || amount <= 0) {
                throw new RuntimeException("Invalid amount");
            }

            JSONObject options = new JSONObject();
            options.put("amount", Math.round(amount * 100));
            options.put("currency", "INR");
            options.put("receipt", "order_" + System.currentTimeMillis());

            System.out.println("===== Razorpay Order Request =====");
            System.out.println(options);

            Order order = razorpayClient.orders.create(options);

            System.out.println("===== Razorpay Order Created =====");
            System.out.println(order);

            return new PaymentResponse(
                    order.get("id").toString(),
                    keyId,
                    Double.parseDouble(order.get("amount").toString()),
                    order.get("currency").toString()
            );

        } catch (Exception e) {

            System.out.println("===== Razorpay Error =====");
            e.printStackTrace();

            throw new RuntimeException("Unable to create Razorpay order: " + e.getMessage());

        }
    }
}