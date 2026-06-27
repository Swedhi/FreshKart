package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository
        extends JpaRepository<Cart, Long> {

    List<Cart> findByUser_Id(
            Long userId
    );

    Optional<Cart> findByUser_IdAndProduct_Id(
            Long userId,
            Long productId
    );

    void deleteByUser_Id(
            Long userId
    );
}