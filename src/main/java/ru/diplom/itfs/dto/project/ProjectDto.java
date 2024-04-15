package ru.diplom.itfs.dto.project;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.dto.SkillDto;
import ru.diplom.itfs.dto.employee.EmployeeDto;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО проекта")
public class ProjectDto {

    @Schema(description = "Название")
    private String name;

    @Schema(description = "Описание")
    private String description;

    @Schema(description = "Команда")
    private List<EmployeeDto> team;

    @Schema(description = "Необходимые компетенции")
    private List<SkillDto> skills;
}
