package ru.diplom.itfs.service.project;

import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.model.entity.User;

import java.util.List;

public interface ProjectService {

    List<ProjectDto> getList(User user);
}
