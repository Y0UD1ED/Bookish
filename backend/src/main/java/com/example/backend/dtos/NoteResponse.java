package com.example.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponse {
    private int id;
    private String name;
    private String author;
    private String image;
    private String readingStatus;
    private String genre;
    private Date startDate;
    private Date endDate;
    private String heroes;
    private String plot;
    private String message;
    private String opinion;
    private boolean isHidden;
    private boolean isImportantBook;
    private boolean moderationPassed;



}
