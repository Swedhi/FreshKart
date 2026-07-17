package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // Create Category
    public Category create(Category category) {

        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new RuntimeException("Category already exists");
        }

        return categoryRepository.save(category);
    }

    // Get All Categories
    public List<Category> getAll() {

        return categoryRepository.findAll();
    }

    // Get Category By Id
    public Category getById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));
    }

    // Update Category
    public Category update(Long id, Category updatedCategory) {

        Category category = getById(id);

        String newName = updatedCategory.getName();

        categoryRepository
                .findByNameIgnoreCase(newName)
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Category already exists");
                    }

                });

        category.setName(newName);

        return categoryRepository.save(category);
    }

    // Delete Category
    public void delete(Long id) {

        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }

        categoryRepository.deleteById(id);
    }

}