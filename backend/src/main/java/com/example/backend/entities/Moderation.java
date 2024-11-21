package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "moderations")
public class Moderation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="moderation_id")
    int id;
    int moderator;
    @ManyToOne
    @JoinColumn(name = "note_id")
    Note note;
    int status;
    String comment;
}
