package ru.diplom.itfs.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.model.enums.UserRoleEnum;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(description = "Дто для обновления пользователя")
public class UserUpdateDto {

    private List<UserRoleEnum> roles;

    private Boolean enabled;
}
