package com.example.demo.controller;

import com.example.demo.dto.NotificationResponse;
import com.example.demo.entity.Notification;
import com.example.demo.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // Create Notification
    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification
    ) {

        return notificationService.createNotification(
                notification
        );
    }

    // Get User Notifications
    @GetMapping("/{userId}")
    public List<NotificationResponse> getUserNotifications(
            @PathVariable Long userId
    ) {

        return notificationService.getUserNotifications(
                userId
        );
    }

    // Mark As Read
    @PutMapping("/read/{notificationId}")
    public Notification markAsRead(
            @PathVariable Long notificationId
    ) {

        return notificationService.markAsRead(
                notificationId
        );
    }
}