package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateNoteRequest {
    @NotBlank(message = "Название не должно быть пустым!")
    private String name;
    @NotBlank(message = "Автор должен быть указан!")
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
}
