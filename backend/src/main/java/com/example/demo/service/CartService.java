package com.example.demo.service;

import com.example.demo.dto.CartItemResponse;
import com.example.demo.dto.CartResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // Add Item To Cart
    public Cart addToCart(Cart cart) {

        User user =
                userRepository.findById(
                        cart.getUser().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        Product product =
                productRepository.findById(
                        cart.getProduct().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Product not found"
                        )
                );

        if (
                cart.getQuantity()
                        > product.getStockQuantity()
        ) {
            throw new RuntimeException(
                    "Insufficient stock"
            );
        }

        cart.setUser(user);
        cart.setProduct(product);

        Cart existingCartItem =
                cartRepository.findByUser_IdAndProduct_Id(
                        user.getId(),
                        product.getId()
                )
                .orElse(null);

        if (existingCartItem != null) {

            int newQuantity =
                    existingCartItem.getQuantity()
                            + cart.getQuantity();

            if (
                    newQuantity >
                            product.getStockQuantity()
            ) {
                throw new RuntimeException(
                        "Insufficient stock"
                );
            }

            existingCartItem.setQuantity(
                    newQuantity
            );

            return cartRepository.save(
                    existingCartItem
            );
        }

        return cartRepository.save(
                cart
        );
    }

    // Get User Cart
    public List<Cart> getUserCart(
            Long userId
    ) {

        return cartRepository.findByUser_Id(
                userId
        );
    }

    // Get Cart With Total
    public CartResponse getCartWithTotal(
            Long userId
    ) {

        List<Cart> cartItems =
                cartRepository.findByUser_Id(
                        userId
                );

        List<CartItemResponse> responseItems =
                new ArrayList<>();

        double totalAmount = 0;

        for (Cart item : cartItems) {

            double subtotal =
                    item.getProduct().getPrice()
                            * item.getQuantity();

            totalAmount += subtotal;

            responseItems.add(
                    new CartItemResponse(
                            item.getId(),
                            item.getProduct().getId(),
                            item.getProduct().getName(),
                            item.getProduct().getPrice(),
                            item.getQuantity(),
                            subtotal
                    )
            );
        }

        return new CartResponse(
                responseItems,
                totalAmount
        );
    }

    // Update Quantity
    public Cart updateQuantity(
            Long cartId,
            Integer quantity
    ) {

        Cart cart =
                cartRepository.findById(
                        cartId
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Cart item not found"
                        )
                );

        Product product =
                cart.getProduct();

        if (
                quantity >
                        product.getStockQuantity()
        ) {
            throw new RuntimeException(
                    "Insufficient stock"
            );
        }

        cart.setQuantity(
                quantity
        );

        return cartRepository.save(
                cart
        );
    }

    // Remove Item
    public void removeItem(
            Long cartId
    ) {

        cartRepository.deleteById(
                cartId
        );
    }
}