package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryLogService inventoryLogService;

    // Create Product
    public Product create(Product product) {
        return productRepository.save(product);
    }

    // Get All Products
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    // Get Product By Id
    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }

    // Update Product
    public Product update(
        Long id,
        Product updatedProduct
) {

    Product product =
            getById(id);

    Integer oldStock =
            product.getStockQuantity();

    product.setName(
            updatedProduct.getName()
    );

    product.setCategory(
            updatedProduct.getCategory()
    );

    product.setPrice(
            updatedProduct.getPrice()
    );

    product.setStockQuantity(
            updatedProduct.getStockQuantity()
    );

    product.setImageUrl(
            updatedProduct.getImageUrl()
    );

    Product savedProduct =
            productRepository.save(
                    product
            );

    inventoryLogService.createLog(
            savedProduct.getId(),
            savedProduct.getName(),
            oldStock,
            savedProduct.getStockQuantity(),
            "PRODUCT_UPDATED"
    );

    return savedProduct;
}

    // Delete Product
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
    public List<Product> searchProducts(
        String keyword
) {

    return productRepository
            .findByNameContainingIgnoreCase(
                    keyword
            );
}
public List<Product> getProductsByCategory(
        String category
) {

    return productRepository
            .findByCategoryIgnoreCase(
                    category
            );
}
public Page<Product> getProductsPaginated(
        int page,
        int size
) {

    return productRepository.findAll(
            PageRequest.of(page, size)
    );
}
public List<Product> getProductsSorted(
        String field
) {

    return productRepository.findAll(
            Sort.by(field)
    );
}
public List<Product> getFeaturedProducts() {

    return productRepository.findAll();
}
}