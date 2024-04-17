package ru.diplom.itfs.dto.skill;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import ru.diplom.itfs.model.enums.SkillType;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Accessors(chain = true)
@Schema(description = "ДТО Создания компетенции")
public class SkillCreateDto extends SkillDto {
}
