package com.example.demo.repository;

import com.example.demo.entity.InventoryLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryLogRepository
        extends JpaRepository<InventoryLog, Long> {

    List<InventoryLog> findAllByOrderByCreatedAtDesc();

}