package ru.diplom.itfs.service.project;

import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.dto.project.TeamFormationParamsDto;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.model.enums.SkillLevelEnum;

import java.util.List;

public interface ProjectService {

    ProjectDto create(User user, ProjectCreateDto dto);

    ProjectDto update(Long id, ProjectUpdateDto dto);

    ProjectDto addSkill(Long id, String skillName, SkillLevelEnum level);

    List<EmployeeDto> createTeam(Long id, TeamFormationParamsDto params);

    ProjectDto saveTeam(Long id, List<EmployeeDto> team);

    List<ProjectDto> getList(User user);
}
