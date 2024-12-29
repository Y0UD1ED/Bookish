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
public class UserDto {
    private int id;
    private String name;
    private String image;
    private String about;
    private List<ShelfDto> shelfs;
    private List<BookDto> personalBooks;
    private List<BookDto> importantBooks;


}
