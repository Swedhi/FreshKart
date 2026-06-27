package com.example.demo.service;

import com.example.demo.dto.WishlistResponse;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.entity.Wishlist;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // Add Product To Wishlist
    public Wishlist addToWishlist(
            Wishlist wishlist
    ) {

        User user =
                userRepository.findById(
                        wishlist.getUser().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        Product product =
                productRepository.findById(
                        wishlist.getProduct().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Product not found"
                        )
                );

        wishlist.setUser(user);
        wishlist.setProduct(product);

        return wishlistRepository.save(
                wishlist
        );
    }

    // Get Wishlist
    public List<WishlistResponse> getWishlist(
            Long userId
    ) {

        return wishlistRepository
                .findByUser_Id(userId)
                .stream()
                .map(item ->
                        new WishlistResponse(
                                item.getId(),
                                item.getProduct().getId(),
                                item.getProduct().getName(),
                                item.getProduct().getCategory(),
                                item.getProduct().getPrice(),
                                item.getProduct().getImageUrl()
                        )
                )
                .toList();
    }

    // Remove Product
    public void removeWishlistItem(
            Long wishlistId
    ) {

        wishlistRepository.deleteById(
                wishlistId
        );
    }
}