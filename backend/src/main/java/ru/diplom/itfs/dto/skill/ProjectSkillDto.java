package ru.diplom.itfs.dto.skill;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@Schema(description = "ДТО компетенции проекта")
public class ProjectSkillDto extends SkillDto {

    @Schema(description = "Уровень требуемой компетенции")
    private Integer skillLevel;
}
