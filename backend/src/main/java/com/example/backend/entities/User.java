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
@Entity(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    int id;
    String mail;
    String password;
    String role;
    @Column(name = "is_activated")
    boolean isActivated;
    @Column(name = "last_name")
    String lastName;
    @Column(name="first_name")
    String firstName;
    @Column(name = "middle_name")
    String middleName;
    String about;
    String photo;

    public User(String password, String mail, String role, String lastName, String firstName) {
        this.password = password;
        this.mail = mail;
        this.role = role;
        this.lastName = lastName;
        this.firstName = firstName;
        this.photo="defaultPhoto";
    }
}
