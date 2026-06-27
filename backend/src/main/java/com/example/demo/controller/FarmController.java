package com.example.demo.controller;

import com.example.demo.entity.Farm;
import com.example.demo.service.FarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
@RequiredArgsConstructor
public class FarmController {

    private final FarmService farmService;

    // Create Farm
    @PostMapping
    public Farm createFarm(
            @RequestBody Farm farm
    ) {
        return farmService.createFarm(farm);
    }

    // Get All Farms
    @GetMapping
    public List<Farm> getAllFarms() {
        return farmService.getAllFarms();
    }

    // Get Farm By Id
    @GetMapping("/{id}")
    public Farm getFarmById(
            @PathVariable Long id
    ) {
        return farmService.getById(id);
    }

    // Update Farm
    @PutMapping("/{id}")
    public Farm updateFarm(
            @PathVariable Long id,
            @RequestBody Farm farm
    ) {
        return farmService.update(id, farm);
    }

    // Delete Farm
    @DeleteMapping("/{id}")
    public String deleteFarm(
            @PathVariable Long id
    ) {
        farmService.delete(id);
        return "Farm deleted successfully";
    }
}