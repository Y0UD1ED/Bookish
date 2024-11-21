package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateShelfRequest {
    @NotBlank(message = "Название не должно быть пустым")
    String name;
    String description;
    String image;
    boolean isHidden;
    List<Integer> books;
}
