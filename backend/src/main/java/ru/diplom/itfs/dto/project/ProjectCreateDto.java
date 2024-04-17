package ru.diplom.itfs.dto.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО для создания проекта")
public class ProjectCreateDto {

    @Schema(description = "Название")
    private String name;

    @Schema(description = "Описание")
    private String description;

    @JsonFormat(pattern = "dd-MM-yyyy")
    @Schema(description = "Дата завершения", pattern = "dd-MM-yyyy")
    private LocalDate deadline;
}
