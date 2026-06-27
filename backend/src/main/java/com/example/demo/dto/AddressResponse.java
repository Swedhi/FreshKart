package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressResponse {

    private Long id;

    private String fullName;

    private String phoneNumber;

    private String addressLine;

    private String city;

    private String state;

    private String pincode;

    private String country;
}