package com.example.demo.service;

import com.example.demo.dto.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.entity.Vendor;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.VendorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;
    private final InventoryLogService inventoryLogService;

    // ===========================
    // Create Product
    // ===========================
    public Product create(Product product) {

        if (product.getVendor() != null &&
                product.getVendor().getId() != null) {

            Vendor vendor = vendorRepository.findById(
                    product.getVendor().getId()
            ).orElseThrow(() ->
                    new RuntimeException("Vendor not found"));

            product.setVendor(vendor);

        } else {

            product.setVendor(null);

        }

        return productRepository.save(product);
    }

    // ===========================
    // Get Product By Id
    // ===========================
    public Product getById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id : " + id
                        ));
    }

    // ===========================
    // Convert Entity → DTO
    // ===========================
    private ProductResponse mapToResponse(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .vendorId(
                        product.getVendor() != null
                                ? product.getVendor().getId()
                                : null
                )
                .vendorName(
                        product.getVendor() != null
                                ? product.getVendor().getVendorName()
                                : ""
                )
                .build();
    }

    // ===========================
    // Get All Products
    // ===========================
    public List<ProductResponse> getAll() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===========================
    // Get Product Response
    // ===========================
    public ProductResponse getProductResponse(Long id) {

        return mapToResponse(getById(id));
    }

    // ===========================
    // Update Product
    // ===========================
    public Product update(Long id, Product updatedProduct) {

        Product product = getById(id);

        Integer oldStock = product.getStockQuantity();

        product.setName(updatedProduct.getName());
        product.setCategory(updatedProduct.getCategory());
        product.setPrice(updatedProduct.getPrice());
        product.setStockQuantity(updatedProduct.getStockQuantity());
        product.setImageUrl(updatedProduct.getImageUrl());

        if (updatedProduct.getVendor() != null &&
                updatedProduct.getVendor().getId() != null) {

            Vendor vendor = vendorRepository.findById(
                    updatedProduct.getVendor().getId()
            ).orElseThrow(() ->
                    new RuntimeException("Vendor not found"));

            product.setVendor(vendor);

        } else {

            product.setVendor(null);

        }

        Product savedProduct = productRepository.save(product);

        inventoryLogService.createLog(
                savedProduct.getId(),
                savedProduct.getName(),
                oldStock,
                savedProduct.getStockQuantity(),
                "PRODUCT_UPDATED"
        );

        return savedProduct;
    }

    // ===========================
    // Update Stock
    // ===========================
    public Product updateStock(Long id, Integer stock) {

        Product product = getById(id);

        Integer oldStock = product.getStockQuantity();

        product.setStockQuantity(stock);

        Product savedProduct = productRepository.save(product);

        inventoryLogService.createLog(
                savedProduct.getId(),
                savedProduct.getName(),
                oldStock,
                stock,
                "STOCK_UPDATED"
        );

        return savedProduct;
    }

    // ===========================
    // Delete Product
    // ===========================
    public void delete(Long id) {

        Product product = getById(id);

        productRepository.delete(product);
    }

    // ===========================
    // Search Products
    // ===========================
    public List<ProductResponse> searchProducts(String keyword) {

        List<Product> products;

        if (keyword == null || keyword.isBlank()) {
            products = productRepository.findAll();
        } else {
            products = productRepository.findByNameContainingIgnoreCase(keyword);
        }

        return products.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===========================
    // Products By Category
    // ===========================
    public List<ProductResponse> getProductsByCategory(String category) {

        return productRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===========================
    // Pagination
    // ===========================
    public Page<Product> getProductsPaginated(int page, int size) {

        return productRepository.findAll(
                PageRequest.of(page, size)
        );
    }

    // ===========================
    // Sorting
    // ===========================
    public List<Product> getProductsSorted(String field) {

        return productRepository.findAll(
                Sort.by(field)
        );
    }

    // ===========================
    // Featured Products
    // ===========================
    public List<ProductResponse> getFeaturedProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ===========================
    // Products By Vendor
    // ===========================
    public List<ProductResponse> getProductsByVendor(Long vendorId) {

        return productRepository.findByVendor_Id(vendorId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}