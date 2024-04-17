package ru.diplom.itfs.service.skills;

import ru.diplom.itfs.dto.skill.SkillCreateDto;
import ru.diplom.itfs.dto.skill.SkillDto;
import ru.diplom.itfs.dto.skill.SkillLevelDto;
import ru.diplom.itfs.model.enums.SkillType;

import java.util.List;

public interface SkillService {

    SkillDto create(SkillCreateDto dto);

    List<SkillDto> getSkills();

    List<SkillDto> getSkillsByType(SkillType type);

    List<SkillLevelDto> getLevels();

}
