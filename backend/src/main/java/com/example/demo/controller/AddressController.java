package com.example.demo.controller;

import com.example.demo.dto.AddressResponse;
import com.example.demo.entity.Address;
import com.example.demo.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    // Add Address
    @PostMapping
    public Address addAddress(
            @RequestBody Address address
    ) {

        return addressService.addAddress(
                address
        );
    }

    // Get User Addresses
    @GetMapping("/{userId}")
    public List<AddressResponse> getUserAddresses(
            @PathVariable Long userId
    ) {

        return addressService.getUserAddresses(
                userId
        );
    }

    // Delete Address
    @DeleteMapping("/{addressId}")
    public String deleteAddress(
            @PathVariable Long addressId
    ) {

        addressService.deleteAddress(
                addressId
        );

        return "Address deleted successfully";
    }
    @PutMapping("/{addressId}")
public Address updateAddress(
        @PathVariable Long addressId,
        @RequestBody Address address
) {

    return addressService.updateAddress(
            addressId,
            address
    );
}
}