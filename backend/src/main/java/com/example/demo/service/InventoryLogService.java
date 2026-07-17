package com.example.demo.service;

import com.example.demo.dto.InventoryLogResponse;
import com.example.demo.entity.InventoryLog;
import com.example.demo.repository.InventoryLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryLogService {

    private final InventoryLogRepository inventoryLogRepository;

    public void createLog(
            Long productId,
            String productName,
            Integer oldStock,
            Integer newStock,
            String action
    ) {

        InventoryLog log = InventoryLog.builder()
                .productId(productId)
                .productName(productName)
                .oldStock(oldStock)
                .newStock(newStock)
                .action(action)
                .createdAt(LocalDateTime.now())
                .build();

        inventoryLogRepository.save(log);
    }

    public List<InventoryLogResponse> getAllLogs() {

        return inventoryLogRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(log -> new InventoryLogResponse(
                        log.getId(),
                        log.getProductId(),
                        log.getProductName(),
                        log.getOldStock(),
                        log.getNewStock(),
                        log.getAction(),
                        log.getCreatedAt()
                ))
                .toList();
    }
    

}