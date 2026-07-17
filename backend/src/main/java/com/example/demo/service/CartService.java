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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // ===============================
    // Add Item To Cart
    // ===============================
    public Cart addToCart(Cart cart) {

        System.out.println("========== SERVICE ==========");

        Long userId = cart.getUser().getId();
        Long productId = cart.getProduct().getId();

        System.out.println("User Id : " + userId);
        System.out.println("Product Id : " + productId);

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        System.out.println("User Exists");
        System.out.println("Product Exists");
        System.out.println("Stock : " + product.getStockQuantity());

        if (cart.getQuantity() == null || cart.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        if (cart.getQuantity() > product.getStockQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        Cart existing = cartRepository
                .findByUser_IdAndProduct_Id(userId, productId)
                .orElse(null);

        if (existing != null) {

            int newQuantity = existing.getQuantity() + cart.getQuantity();

            if (newQuantity > product.getStockQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }

            existing.setQuantity(newQuantity);

            System.out.println("Updating Existing Cart");

            return cartRepository.saveAndFlush(existing);
        }

        Cart newCart = new Cart();

        newCart.setUser(user);
        newCart.setProduct(product);
        newCart.setQuantity(cart.getQuantity());

        System.out.println("Saving New Cart");

        Cart saved = cartRepository.saveAndFlush(newCart);

        System.out.println("Saved Cart Id : " + saved.getId());

        return saved;
    }

    // ===============================
    // Get User Cart
    // ===============================
    public List<Cart> getUserCart(Long userId) {

        return cartRepository.findByUser_Id(userId);
    }

    // ===============================
    // Get Cart With Total
    // ===============================
    public CartResponse getCartWithTotal(Long userId) {

        List<Cart> cartItems = cartRepository.findByUser_Id(userId);

        List<CartItemResponse> responseItems = new ArrayList<>();

        double totalAmount = 0;

        for (Cart item : cartItems) {

            double subtotal =
                    item.getProduct().getPrice() * item.getQuantity();

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

        return new CartResponse(responseItems, totalAmount);
    }

    // ===============================
    // Update Quantity
    // ===============================
    public Cart updateQuantity(Long cartId, Integer quantity) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException("Cart item not found"));

        Product product = cart.getProduct();

        if (quantity > product.getStockQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }

    // ===============================
    // Remove Item
    // ===============================
    public void removeItem(Long cartId) {

        cartRepository.deleteById(cartId);
    }

}