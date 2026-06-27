package com.example.demo.controller;

import com.example.demo.dto.CartResponse;
import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Add Item
    @PostMapping("/add")
    public Cart addToCart(
            @RequestBody Cart cart
    ) {

        return cartService.addToCart(
                cart
        );
    }

    // Get User Cart With Total
    @GetMapping("/{userId}")
    public CartResponse getCart(
            @PathVariable Long userId
    ) {

        return cartService.getCartWithTotal(
                userId
        );
    }

    // Update Quantity
    @PutMapping("/{cartId}")
    public Cart updateQuantity(
            @PathVariable Long cartId,
            @RequestParam Integer quantity
    ) {

        return cartService.updateQuantity(
                cartId,
                quantity
        );
    }

    // Remove Item
    @DeleteMapping("/{cartId}")
    public String removeItem(
            @PathVariable Long cartId
    ) {

        cartService.removeItem(
                cartId
        );

        return "Item removed from cart";
    }
}