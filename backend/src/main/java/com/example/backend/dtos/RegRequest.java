package com.example.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegRequest {
    @NotBlank(message = "Имя не может быть пустым")
    private String firstName;

    @NotBlank(message = "Фамилия не может быть пустой")
    private String lastName;

    @NotBlank(message = "Почта не может быть пустой")
    @Email(message = "Указанный адрес не является почтой")
    private String mail;

    @NotBlank(message = "Выбор роли обязателен")
    @Pattern(regexp = "^(student|teacher|moderator)$", message = "Данной роли не существует")
    private String role;

    @NotBlank(message = "Пароль не должен быть пустым")
    @Length(min = 6,message = "Слишком короткий пароль")
    private String password;

    @NotBlank(message = "Пароль не может быть пустым")
    @Length(min = 6,message = "Слишком короткий пароль")
    private String passwordRepeat;
}
