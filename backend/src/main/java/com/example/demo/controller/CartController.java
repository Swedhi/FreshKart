package com.example.demo.controller;

import com.example.demo.dto.CartResponse;
import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {

        System.out.println("============= ADD TO CART =============");
        System.out.println(cart);

        return cartService.addToCart(cart);
    }

    @GetMapping("/{userId}")
    public CartResponse getCart(@PathVariable Long userId) {
        return cartService.getCartWithTotal(userId);
    }

    @PutMapping("/{cartId}")
    public Cart updateQuantity(
            @PathVariable Long cartId,
            @RequestParam Integer quantity) {

        return cartService.updateQuantity(cartId, quantity);
    }

    @DeleteMapping("/{cartId}")
    public String removeItem(@PathVariable Long cartId) {

        cartService.removeItem(cartId);

        return "Item removed successfully";
    }
}