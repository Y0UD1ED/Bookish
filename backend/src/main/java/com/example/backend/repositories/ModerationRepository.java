package com.example.backend.repositories;

import com.example.backend.entities.Moderation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModerationRepository extends JpaRepository<Moderation,Integer> {
}
