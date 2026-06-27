package com.example.demo.controller;

import com.example.demo.dto.WishlistResponse;
import com.example.demo.entity.Wishlist;
import com.example.demo.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    // Add Product
    @PostMapping("/add")
    public Wishlist addToWishlist(
            @RequestBody Wishlist wishlist
    ) {

        return wishlistService.addToWishlist(
                wishlist
        );
    }

    // Get Wishlist
    @GetMapping("/{userId}")
    public List<WishlistResponse> getWishlist(
            @PathVariable Long userId
    ) {

        return wishlistService.getWishlist(
                userId
        );
    }

    // Remove Product
    @DeleteMapping("/{wishlistId}")
    public String removeWishlistItem(
            @PathVariable Long wishlistId
    ) {

        wishlistService.removeWishlistItem(
                wishlistId
        );

        return "Wishlist item removed";
    }
}