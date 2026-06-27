package com.example.demo.repository;

import com.example.demo.entity.InventoryLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryLogRepository
        extends JpaRepository<InventoryLog, Long> {
}