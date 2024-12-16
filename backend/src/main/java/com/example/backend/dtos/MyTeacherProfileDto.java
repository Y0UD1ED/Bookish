package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyTeacherProfileDto extends MyProfileDto {
    private List<ClassDto> myClasses;

    public MyTeacherProfileDto(int id, String name,String image,String about, String role) {
        super(id, name, image, about, role);
    }
}
