package com.example.backend.repositories;

import com.example.backend.entities.Moderation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ModerationRepository extends JpaRepository<Moderation,Integer> {
    @Query("SELECT m FROM moderations m JOIN m.note n WHERE n.id = :noteId")
    Moderation findModerationByNoteId(@Param("noteId") Integer noteId);
}
