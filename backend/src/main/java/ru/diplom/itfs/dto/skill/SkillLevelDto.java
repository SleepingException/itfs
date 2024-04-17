package ru.diplom.itfs.dto.skill;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.model.enums.SkillLevelEnum;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО уровня владения компетенцией")
public class SkillLevelDto {

    @Schema(description = "ИД")
    private Long id;

    @Schema(description = "Код уровня")
    private SkillLevelEnum level;

    @Schema(description = "Название уровня")
    private String levelName;

    @Schema(description = "Описание уровня")
    private String description;
}
