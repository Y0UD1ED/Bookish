package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateNoteRequest {
    @NotBlank(message = "Название книги не должно быть пустым")
    String name;
    @NotBlank(message = "Имя автора не должно быть пустым")
    String author;
    boolean isHidden;
    String image;
}
