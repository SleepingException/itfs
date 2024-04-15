package ru.diplom.itfs.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.diplom.itfs.dto.SkillDto;
import ru.diplom.itfs.model.entity.Skill;

@Mapper(componentModel = "spring")
public interface SkillMapper {

    @Mapping(source = "level.level", target = "level")
    @Mapping(source = "level.description", target = "levelDescription")
    SkillDto toDto(Skill skill);
}
