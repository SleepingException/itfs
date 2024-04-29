package ru.diplom.itfs.dto.project;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО изменения проекта")
public class ProjectUpdateDto {

    @Schema(description = "Название")
    private String name;

    @Schema(description = "Описание")
    private String description;
}
