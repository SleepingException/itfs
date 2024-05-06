package ru.diplom.itfs.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.dto.skill.ProjectSkillDto;
import ru.diplom.itfs.model.entity.Project;
import ru.diplom.itfs.model.enums.SkillType;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, SkillMapper.class})
public abstract class ProjectMapper {

    @Autowired
    SkillMapper skillMapper;

    public abstract ProjectDto toDto(Project project);

    @AfterMapping
    protected void afterToDto(Project project, @MappingTarget ProjectDto dto) {
        List<ProjectSkillDto> hardSkills = Optional.ofNullable(project.getRequiredSkills())
                .orElse(Collections.emptySet())
                .stream()
                .filter(skill -> SkillType.HARD.equals(skill.getType()))
                .map(skillMapper::toProjectSkill)
                .toList();

        List<ProjectSkillDto> softSkills = Optional.ofNullable(project.getRequiredSkills())
                .orElse(Collections.emptySet())
                .stream()
                .filter(skill -> SkillType.SOFT.equals(skill.getType()))
                .map(skillMapper::toProjectSkill)
                .toList();

        dto.setHardSkills(hardSkills).setSoftSkills(softSkills);
    }

    public abstract Project toEntity(ProjectCreateDto createDto);

    @Mapping(source = "dto.name", target = "project.name",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "dto.description", target = "project.description",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract void update(ProjectUpdateDto dto, @MappingTarget Project project);
}
