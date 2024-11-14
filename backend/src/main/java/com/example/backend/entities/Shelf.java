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
@Entity(name = "shelfs")
public class Shelf {
    @Id
    @Column(name = "shelf_id")
    int id;
    int owner;
    String name;
    String description;
    @ManyToMany
    @JoinTable(
            name = "notes_shelfs",
            joinColumns = @JoinColumn(name = "shelf_id"),
            inverseJoinColumns = @JoinColumn(name = "note_id"))
    List<Note> notes;
}
