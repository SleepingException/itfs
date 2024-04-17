package ru.diplom.itfs.dto.skill;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.model.enums.SkillType;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "ДТО Компетенции")
public class SkillDto {

    @Schema(description = "Название")
    private String name;

    @Schema(description = "Описание")
    private String description;

    @Schema(description = "Тип навыка")
    private SkillType type;
}
