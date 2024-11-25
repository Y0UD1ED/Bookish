package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassBookResponse extends BookDto {
    private int haveRead;
    private int isReading;
    private int wantToRead;

    public ClassBookResponse(int id, String name, String author, String image, int haveRead, int isReading, int wantToRead) {
        super(id, name, author, image);
        this.haveRead = haveRead;
        this.isReading = isReading;
        this.wantToRead = wantToRead;
    }

}
