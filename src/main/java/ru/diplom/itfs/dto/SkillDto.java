package ru.diplom.itfs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.model.enums.SkillType;

@Data
@Accessors(chain = true)
@Schema(description = "ДТО Компетенции")
public class SkillDto {

    @Schema(description = "ИД")
    private Long id;

    @Schema(description = "Название")
    private String name;

    @Schema(description = "Описание")
    private String description;

    @Schema(description = "Тип навыка")
    private SkillType type;

    @Schema(description = "Уровень владения компетенции")
    private SkillLevelEnum level;

    @Schema(description = "Описание уровня")
    private String levelDescription;
}
