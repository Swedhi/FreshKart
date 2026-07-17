package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public Category createCategory(
            @RequestBody Category category
    ) {
        return categoryService.create(category);
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public Category getCategory(
            @PathVariable Long id
    ) {
        return categoryService.getById(id);
    }

    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Long id,
            @RequestBody Category category
    ) {
        return categoryService.update(id, category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(
            @PathVariable Long id
    ) {

        categoryService.delete(id);

        return "Category deleted successfully";
    }
}