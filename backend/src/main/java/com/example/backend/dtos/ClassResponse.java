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
public class ClassResponse {
    private int id;
    private String name;
    private String image;
    private int studentCount;
    private int owner;
    private String code;
    private int allRead;
    private int nothingRead;
    private int avgRead;
    private int maxRead;
    private int minRead;
    private List<BookDto> books;
    private List<StudentDto> students;
}
