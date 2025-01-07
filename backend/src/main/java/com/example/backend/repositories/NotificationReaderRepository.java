package com.example.backend.repositories;

import com.example.backend.entities.NotificationReader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationReaderRepository extends JpaRepository<NotificationReader,Integer> {
}
