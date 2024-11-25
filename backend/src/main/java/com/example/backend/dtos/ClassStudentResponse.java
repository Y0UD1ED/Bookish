package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassStudentResponse extends StudentDto{
    private int haveRead;
    private int isReading;
    private int wantToRead;
    public ClassStudentResponse(int id, String name, String image, int haveRead, int isReading, int wantToRead) {
        super(id, name, image);
        this.haveRead = haveRead;
        this.isReading = isReading;
        this.wantToRead = wantToRead;
    }
}
