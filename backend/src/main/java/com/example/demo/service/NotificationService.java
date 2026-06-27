package com.example.demo.service;

import com.example.demo.dto.NotificationResponse;
import com.example.demo.entity.Notification;
import com.example.demo.entity.User;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    // Create Notification
    public Notification createNotification(
            Notification notification
    ) {

        User user =
                userRepository.findById(
                        notification.getUser().getId()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        notification.setUser(user);
        notification.setRead(false);
        notification.setCreatedAt(
                LocalDateTime.now()
        );

        return notificationRepository.save(
                notification
        );
    }

    // Get User Notifications
    public List<NotificationResponse> getUserNotifications(
            Long userId
    ) {

        return notificationRepository
                .findByUser_IdOrderByCreatedAtDesc(
                        userId
                )
                .stream()
                .map(notification ->
                        new NotificationResponse(
                                notification.getId(),
                                notification.getMessage(),
                                notification.getRead(),
                                notification.getCreatedAt()
                        )
                )
                .toList();
    }

    // Mark As Read
    public Notification markAsRead(
            Long notificationId
    ) {

        Notification notification =
                notificationRepository.findById(
                        notificationId
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Notification not found"
                        )
                );

        notification.setRead(true);

        return notificationRepository.save(
                notification
        );
    }
}