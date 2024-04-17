package ru.diplom.itfs.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.model.entity.Project;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, SkillMapper.class})
public interface ProjectMapper {

    ProjectDto toDto(Project project);

    Project toEntity(ProjectCreateDto createDto);

//    @Mapping(source = "dto.name", target = "project.name",
//            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(ProjectUpdateDto dto, @MappingTarget Project project);
}
