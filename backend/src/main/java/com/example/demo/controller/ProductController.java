package com.example.demo.controller;


import com.example.demo.dto.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // ===========================
    // Create Product
    // ===========================
    @PostMapping
    public Product createProduct(
            @RequestBody Product product
    ) {
        return productService.create(product);
    }

    // ===========================
    // Get All Products
    // ===========================
    @GetMapping
    public List<ProductResponse> getAllProducts() {

        return productService.getAll();
    }

    // ===========================
    // Get Product By Id
    // ===========================
    @GetMapping("/{id}")
    public ProductResponse getProductById(
            @PathVariable Long id
    ) {

        return productService.getProductResponse(id);
    }

    // ===========================
    // Update Product
    // ===========================
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        return productService.update(id, product);
    }

    // ===========================
    // Update Stock
    // ===========================
    @PatchMapping("/{id}/stock")
    public Product updateStock(
            @PathVariable Long id,
            @RequestParam Integer stock
    ) {

        return productService.updateStock(id, stock);
    }

    // ===========================
    // Delete Product
    // ===========================
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id
    ) {

        productService.delete(id);

        return "Product deleted successfully";
    }

    // ===========================
    // Search Products
    // ===========================
    @GetMapping("/search")
    public List<ProductResponse> searchProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String keyword
    ) {

        String searchTerm = (q != null) ? q : keyword;

        return productService.searchProducts(searchTerm);
    }

    // ===========================
    // Products By Category
    // ===========================
    @GetMapping("/category/{category}")
    public List<ProductResponse> getProductsByCategory(
            @PathVariable String category
    ) {

        return productService.getProductsByCategory(category);
    }

    // ===========================
    // Products By Vendor
    // ===========================
    @GetMapping("/vendor/{vendorId}")
    public List<ProductResponse> getProductsByVendor(
            @PathVariable Long vendorId
    ) {

        return productService.getProductsByVendor(vendorId);
    }

    // ===========================
    // Pagination
    // ===========================
    @GetMapping("/paginated")
    public Page<Product> getProductsPaginated(
            @RequestParam int page,
            @RequestParam int size
    ) {

        return productService.getProductsPaginated(page, size);
    }

    // ===========================
    // Sorting
    // ===========================
    @GetMapping("/sorted")
    public List<Product> getProductsSorted(
            @RequestParam String field
    ) {

        return productService.getProductsSorted(field);
    }

    // ===========================
    // Featured Products
    // ===========================
    @GetMapping("/featured")
    public List<ProductResponse> getFeaturedProducts() {

        return productService.getFeaturedProducts();
    }
    

}