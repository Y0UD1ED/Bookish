package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyProfileDto {
    private String name;
    private String about;
    private String role;
    private int notificationCount;

    public MyProfileDto(String name, String about, String role) {
        this.name = name;
        this.about = about;
        this.role = role;
    }
}
