package ru.diplom.itfs.dto.employee;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class EmployeeUpdateDto {

    @Schema(description = "Имя")
    private String firstName;

    @Schema(description = "Фамилия")
    private String secondName;

    @Schema(description = "Отчество")
    private String lastName;

    @Schema(description = "Контактный телефон")
    private String phone;
}
