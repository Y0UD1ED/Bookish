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
public class MyStudentProfileDto extends MyProfileDto{
    private List<ClassDto> myClasses;
    private List<ShelfDto> myShelfs;
    private List<BookDto> myPersonalBooks;
    private List<BookDto> myImportantBooks;

    public MyStudentProfileDto(int id,String name, String about, String role) {
        super(id,name, about, role);
    }
}
