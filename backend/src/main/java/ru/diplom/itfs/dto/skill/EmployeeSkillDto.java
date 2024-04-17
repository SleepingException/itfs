package ru.diplom.itfs.dto.skill;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Schema(description = "ДТО компетенции сотрудника")
public class EmployeeSkillDto extends SkillDto {

    @Schema(description = "Уровень владения компетенцией")
    private String skillLevel;
}
