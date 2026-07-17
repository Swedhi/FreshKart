package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

    }

    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {

            throw new RuntimeException("User not found");

        }

        userRepository.deleteById(id);

    }

}