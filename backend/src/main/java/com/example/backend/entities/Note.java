package com.example.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    @Column(name = "note_id")
    int id;
    @Column(name = "user_id")
    int userId;
    String name;
    String author;
    @Column(name="is_hidden")
    boolean isHidden;
    @Column(name="reading_status")
    String readingStatus;
    @Column(name="start_date")
    Date startDate;
    @Column(name="end_date")
    Date endDate;
    String image;
    String genre;
    String heroes;
    String plot;
    String message;
    String opinion;
}
