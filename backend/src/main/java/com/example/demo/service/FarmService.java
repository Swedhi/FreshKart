package com.example.demo.service;

import com.example.demo.entity.Farm;
import com.example.demo.repository.FarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmService {

    private final FarmRepository farmRepository;

    // Create Farm
    public Farm createFarm(Farm farm) {
        return farmRepository.save(farm);
    }

    // Get All Farms
    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

    // Get Farm By Id
    public Farm getById(Long id) {

        return farmRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Farm not found"
                        ));
    }

    // Update Farm
    public Farm update(
            Long id,
            Farm updatedFarm
    ) {

        Farm farm = getById(id);

        farm.setName(updatedFarm.getName());
        farm.setLocation(updatedFarm.getLocation());
        farm.setArea(updatedFarm.getArea());

        return farmRepository.save(farm);
    }

    // Delete Farm
    public void delete(Long id) {

        farmRepository.deleteById(id);
    }
}