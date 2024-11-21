package com.example.backend.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    int id;
    @Column(name = "user_id")
    int userId;
    @Column(name = "book_id")
    Integer bookId;
    String name;
    String author;
    @Column(name="is_hidden")
    boolean isHidden;
    @Column(name="reading_status")
    String readingStatus="планирую читать";
    @Column(name="start_date")
    Date startDate=new Date();
    @Column(name="end_date")
    Date endDate;
    String image;
    String genre="жанр";
    String heroes="Нет записи";
    String plot="Нет записи";
    String message="Нет записи";
    String opinion="Нет записи";

    public Note(int userId, Integer bookId, String name, String author,String image, boolean isHidden) {
        this.userId = userId;
        this.bookId = bookId;
        this.name = name;
        this.author = author;
        this.image=image;
        this.isHidden = isHidden;
    }
}
