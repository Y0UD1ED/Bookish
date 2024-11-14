package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "books")
public class Book {
    @Id
    @Column(name="book_id")
    int id;
    String name;
    String author;
    String image;
    @OneToMany
    @JoinColumn(name = "book_id")
    List<Note> notes;
}
