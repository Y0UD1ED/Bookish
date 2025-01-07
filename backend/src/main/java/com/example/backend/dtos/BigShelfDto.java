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
public class BigShelfDto {
    private int id;
    private int owner;
    private String name;
    private String description;
    private String image;
    private boolean isHidden;
    private List<BookDto> books;
}

