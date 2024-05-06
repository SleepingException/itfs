package ru.diplom.itfs.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.dto.project.TeamFormationParamsDto;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.service.project.ProjectService;

import java.util.List;

@Tag(name = "API Проектов")
@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping("/create")
    public ProjectDto create(@AuthenticationPrincipal User user, ProjectCreateDto createDto) {
        return projectService.create(user, createDto);
    }

    @PatchMapping("/{id}")
    public ProjectDto update(@PathVariable Long id,
                             @RequestBody ProjectUpdateDto dto) {
        return projectService.update(id, dto);
    }

    @PatchMapping("/{id}/skills")
    public ProjectDto addSkill(@PathVariable Long id,
                               @RequestParam(name = "skillName") String skillName,
                               @RequestParam(name = "level") SkillLevelEnum level) {
        return projectService.addSkill(id, skillName, level);
    }


    @PostMapping("/{id}/team/start-formation")
    public List<EmployeeDto> startTeamFormation(@PathVariable Long id,
                                                @RequestBody @Valid TeamFormationParamsDto params) {
        return projectService.createTeam(id, params);
    }

    @PostMapping("/{id}/team/approve")
    public ProjectDto approveTeam(@PathVariable Long id,
                                  @RequestBody List<EmployeeDto> employees) {
        return projectService.saveTeam(id, employees);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_EMPLOYEE')")
    @GetMapping
    public List<ProjectDto> list(@AuthenticationPrincipal User user) {
        return projectService.getList(user);
    }
}
