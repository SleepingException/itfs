package ru.diplom.itfs.service.project;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.mapper.ProjectMapper;
import ru.diplom.itfs.model.entity.Project;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.model.enums.UserRoleEnum;
import ru.diplom.itfs.repository.ProjectRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    @Override
    public ProjectDto create(User user, ProjectCreateDto dto) {
        Project project = projectMapper.toEntity(dto);
        project.setAuthor(user.getEmployee());

        projectRepository.save(project);

        return projectMapper.toDto(project);
    }

    @Override
    public ProjectDto update(ProjectUpdateDto dto) {
        return null;
    }

    @Override
    public List<ProjectDto> getList(User user) {
        Set<Project> userProjects = user.getEmployee().getProjects();

        if (user.hasRole(UserRoleEnum.ROLE_MANAGER) || user.hasRole(UserRoleEnum.ROLE_ADMIN)) {
            userProjects.addAll(projectRepository.findAllByAuthorId(user.getEmployee().getId()));
        }

        return user.getEmployee().getProjects().stream()
                .map(projectMapper::toDto)
                .toList();
    }
}
