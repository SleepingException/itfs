package ru.diplom.itfs.dto.project;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(description = "Дто параметров формирования команды")
public class TeamFormationParamsDto {

    @Schema(description = "Размер команды")
    @NotNull
    private Integer teamSize;

    @Schema(description = "Учитывать уже занятых сотрудников")
    private Boolean withBusyEmployees = false;
}
