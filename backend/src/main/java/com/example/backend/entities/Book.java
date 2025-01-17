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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="book_id")
    int id;
    String name;
    String author;
    String image;
    @Column(name = "class_id")
    int classId;
    @OneToMany
    @JoinColumn(name = "book_id")
    List<Note> notes;

    public Book(String name, String author, String image,int classId) {
        this.name = name;
        this.author = author;
        this.image = image;
        this.classId=classId;
    }
}
