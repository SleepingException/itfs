package ru.diplom.itfs.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.model.enums.UserRoleEnum;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(description = "Дто пользователя")
public class UserDto {

    @Schema(description = "ИД")
    private Long id;

    @Schema(description = "ФИО")
    private String fullName;

    @Schema(description = "Роли")
    private List<UserRoleEnum> roles;

    @Schema(description = "Активен да/нет")
    private Boolean enabled;
}
