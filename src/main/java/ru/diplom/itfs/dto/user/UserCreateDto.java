package ru.diplom.itfs.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Schema(description = "Дто для создания пользователя")
@Data
@Accessors(chain = true)
public class UserCreateDto {

    @Schema(description = "Логин")
    private String username;

    @Schema(description = "Пароль")
    private String password;

    @Schema(description = "Имя")
    private String firstName;

    @Schema(description = "Фамилия")
    private String secondName;

    @Schema(description = "Телефон")
    private String phone;
}
