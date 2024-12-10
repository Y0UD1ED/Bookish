package com.example.backend.repositories;

import com.example.backend.entities.Note;
import jakarta.annotation.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note,Integer> {
    List<Note> findTop5ByUserIdAndBookId(int userId, @Nullable Integer bookId);

    List<Note> findTop5ByUserIdAndBookIdIsNotNull(int userId);

    List<Note> findNotesByUserIdAndBookIdIsNotNull(int userId);

    List<Note> findNotesByUserIdAndBookId(int userId, @Nullable Integer bookId);
}
