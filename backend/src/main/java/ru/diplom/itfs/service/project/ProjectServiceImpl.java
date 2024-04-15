package ru.diplom.itfs.service.project;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.model.entity.User;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    @Override
    public List<ProjectDto> getList(User user) {
        return null;
    }
}
