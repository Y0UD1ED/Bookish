package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "users_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationReader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "is_unread")
    private boolean isUnread=true;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;

    public NotificationReader(User user, Notification notification) {
        this.user = user;
        this.notification = notification;
    }
}
