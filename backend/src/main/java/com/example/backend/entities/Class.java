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
@Entity(name = "classes")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="class_id")
    int id;
    int owner;
    @Column(name = "class_name")
    String name;
    String image;
    String code;
    @ManyToMany
    @JoinTable(
            name = "users_classes",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    List<User> students;
    @OneToMany
    @JoinColumn(name = "class_id")
    List<Book> books;
}
