package ru.diplom.itfs.dto.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.dto.skill.ProjectSkillDto;
import ru.diplom.itfs.dto.skill.SkillDto;
import ru.diplom.itfs.dto.employee.EmployeeDto;

import java.time.LocalDate;
import java.util.List;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО проекта")
public class ProjectDto {

    @Schema(description = "ИД")
    private Long id;

    @Schema(description = "Название")
    private String name;

    @Schema(description = "Описание")
    private String description;

    @Schema(description = "Создатель")
    private EmployeeDto author;

    @Schema(description = "Команда")
    private List<EmployeeDto> team;

    @Schema(description = "Необходимые компетенции hard")
    private List<ProjectSkillDto> hardSkills;

    @Schema(description = "Необходимые компетенции soft")
    private List<ProjectSkillDto> softSkills;

    @JsonFormat(pattern = "dd-MM-yyyy")
    @Schema(description = "Дата завершения", pattern = "dd-MM-yyyy")
    private LocalDate deadline;
}
