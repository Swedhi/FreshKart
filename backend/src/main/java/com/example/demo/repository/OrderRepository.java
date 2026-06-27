package com.example.demo.repository;

import com.example.demo.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findTop5ByOrderByOrderDateDesc();

    List<Order> findByOrderDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    List<Order> findByUser_Id(Long userId);
}