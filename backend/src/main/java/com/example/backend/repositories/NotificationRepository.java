package com.example.backend.repositories;

import com.example.backend.entities.Class;
import com.example.backend.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    @Query("SELECT n FROM notifications n JOIN n.notificationReaders r WHERE r.user.id = :userId")
    List<Notification> findNotificationsByUserId(@Param("userId") Integer userId);

}
