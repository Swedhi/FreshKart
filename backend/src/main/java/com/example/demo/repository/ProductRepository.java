package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    List<Product> findByStockQuantityLessThan(
            Integer stock
    );

    List<Product> findByStockQuantityLessThanEqual(
            Integer stockQuantity
    );

    List<Product> findAllByOrderByStockQuantityDesc(
            Pageable pageable
    );
    List<Product> findByNameContainingIgnoreCase(
        String keyword
);
List<Product> findByCategoryIgnoreCase(
        String category
);


}