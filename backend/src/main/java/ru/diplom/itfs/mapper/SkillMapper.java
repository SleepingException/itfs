package ru.diplom.itfs.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.diplom.itfs.dto.skill.ProjectSkillDto;
import ru.diplom.itfs.dto.skill.SkillCreateDto;
import ru.diplom.itfs.dto.skill.SkillDto;
import ru.diplom.itfs.dto.skill.SkillLevelDto;
import ru.diplom.itfs.dto.skill.EmployeeSkillDto;
import ru.diplom.itfs.model.entity.Skill;
import ru.diplom.itfs.model.entity.SkillLevel;

@Mapper(componentModel = "spring", uses = {UtilsMapper.class})
public interface SkillMapper {

    SkillDto toDto(Skill skill);

    Skill toEntity(SkillCreateDto dto);

    SkillLevelDto levelToDto(SkillLevel skillLevel);

    @Mapping(source = "level.level", target = "skillLevel")
    EmployeeSkillDto toEmployeeSkill(Skill skill);

    @Mapping(source = "level.level", target = "skillLevel")
    ProjectSkillDto toProjectSkill(Skill skill);
}
