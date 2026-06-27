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
}