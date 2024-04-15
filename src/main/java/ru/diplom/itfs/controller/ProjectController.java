package ru.diplom.itfs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.service.project.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public List<ProjectDto> list(@AuthenticationPrincipal User user) {
        return List.of();
    }
}
