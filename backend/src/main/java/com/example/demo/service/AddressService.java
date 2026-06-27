package com.example.demo.service;

import com.example.demo.dto.AddressResponse;
import com.example.demo.entity.Address;
import com.example.demo.entity.User;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    // Add Address
    public Address addAddress(
            Address address
    ) {

        User user =
                userRepository.findById(
                        address.getUser().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        address.setUser(user);

        return addressRepository.save(
                address
        );
    }

    // Get User Addresses
    public List<AddressResponse> getUserAddresses(
            Long userId
    ) {

        return addressRepository
                .findByUser_Id(userId)
                .stream()
                .map(address ->
                        new AddressResponse(
                                address.getId(),
                                address.getFullName(),
                                address.getPhoneNumber(),
                                address.getAddressLine(),
                                address.getCity(),
                                address.getState(),
                                address.getPincode(),
                                address.getCountry()
                        )
                )
                .toList();
    }

    // Delete Address
    public void deleteAddress(
            Long addressId
    ) {

        if (
                !addressRepository.existsById(
                        addressId
                )
        ) {

            throw new RuntimeException(
                    "Address not found"
            );
        }

        addressRepository.deleteById(
                addressId
        );
    }
    public Address updateAddress(
        Long addressId,
        Address updatedAddress
) {

    Address address =
            addressRepository.findById(
                    addressId
            )
            .orElseThrow(
                    () -> new RuntimeException(
                            "Address not found"
                    )
            );

    address.setFullName(
            updatedAddress.getFullName()
    );

    address.setPhoneNumber(
            updatedAddress.getPhoneNumber()
    );

    address.setAddressLine(
            updatedAddress.getAddressLine()
    );

    address.setCity(
            updatedAddress.getCity()
    );

    address.setState(
            updatedAddress.getState()
    );

    address.setPincode(
            updatedAddress.getPincode()
    );

    address.setCountry(
            updatedAddress.getCountry()
    );

    return addressRepository.save(
            address
    );
}
}