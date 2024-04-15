package ru.diplom.itfs.dto.employee;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.dto.SkillDto;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО сотрудника")
public class EmployeeDto {

    @Schema(description = "Ид")
    private Long id;

    @Schema(description = "Имя")
    private String firstName;

    @Schema(description = "Фамилия")
    private String secondName;

    @Schema(description = "Отчество")
    private String lastName;

    @Schema(description = "Должность")
    private String position;

    @Schema(description = "ЗП")
    private Double salary;

    @Schema(description = "Контактный телефон")
    private String phone;

    @Schema(description = "Компетенции")
    private List<SkillDto> skills;
}
