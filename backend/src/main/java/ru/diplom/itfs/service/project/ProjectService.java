package ru.diplom.itfs.service.project;

import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.model.entity.User;

import java.util.List;

public interface ProjectService {

    ProjectDto create(User user, ProjectCreateDto dto);

    ProjectDto update(ProjectUpdateDto dto);

    List<ProjectDto> getList(User user);
}
