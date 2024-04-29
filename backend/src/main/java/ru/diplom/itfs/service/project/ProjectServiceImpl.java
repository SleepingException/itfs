package ru.diplom.itfs.service.project;

import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.project.ProjectCreateDto;
import ru.diplom.itfs.dto.project.ProjectDto;
import ru.diplom.itfs.dto.project.ProjectUpdateDto;
import ru.diplom.itfs.dto.project.TeamFormationParamsDto;
import ru.diplom.itfs.exceptions.BadRequest;
import ru.diplom.itfs.mapper.ProjectMapper;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.entity.Project;
import ru.diplom.itfs.model.entity.Skill;
import ru.diplom.itfs.model.entity.SkillLevel;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.model.enums.UserRoleEnum;
import ru.diplom.itfs.repository.EmployeeRepository;
import ru.diplom.itfs.repository.ProjectRepository;
import ru.diplom.itfs.repository.SkillLevelRepository;
import ru.diplom.itfs.repository.SkillRepository;
import ru.diplom.itfs.service.employee.EmployeeService;

import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final EmployeeService employeeService;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final SkillLevelRepository skillLevelRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public ProjectDto create(User user, ProjectCreateDto dto) {
        Project project = projectMapper.toEntity(dto);
        project.setAuthor(user.getEmployee());

        projectRepository.save(project);

        return projectMapper.toDto(project);
    }

    @Override
    @Transactional
    public ProjectDto update(Long id, ProjectUpdateDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует проект с id = %s", id)));

        projectMapper.update(dto, project);
        projectRepository.save(project);

        return projectMapper.toDto(project);
    }

    @Override
    public ProjectDto addSkill(Long id, String skillName, SkillLevelEnum levelEnum) {
        SkillLevel skillLevel = skillLevelRepository.getSkillLevelByLevel(levelEnum);
        Skill skill = skillRepository.getSkillByNameAndLevel(skillName, skillLevel)
                .orElseThrow(() ->
                        new BadRequest(String
                                .format("Отсутсвует компетенция %s с уровнем %s", skillName, levelEnum.getLevelName())));

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует проект с id = %s", id)));

        project.addSkill(skill);
        projectRepository.save(project);

        return projectMapper.toDto(project);
    }

    @Override
    public List<EmployeeDto> createTeam(Long id, TeamFormationParamsDto params) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует проект с id = %s", id)));

        List<Employee> employees = params.getWithBusyEmployees() ?
                employeeRepository.findAll() :
                employeeRepository.findAllByProjectsIsEmpty();

        LinkedList<Double> projectSkillsVector = new LinkedList<>();
        Map<Long, List<Double>> employeesSkillMap = new HashMap<>();

        for (Skill projectSkill : project.getRequiredSkills()) {
            for (Employee employee : employees) {
                employeesSkillMap.putIfAbsent(employee.getId(), new LinkedList<>());
                Map<String, Skill> employeeSkillsMap = employee.getSkills()
                        .stream().collect(Collectors.toMap(Skill::getName, item -> item));

                if (employeeSkillsMap.containsKey(projectSkill.getName())) {
                    Skill employeeSkill = employeeSkillsMap.get(projectSkill.getName());
                    employeesSkillMap.get(employee.getId()).add((double) employeeSkill.getLevel().getLevel().ordinal());
                } else {
                    employeesSkillMap.get(employee.getId()).add(0d);
                }
            }
            projectSkillsVector.add((double) projectSkill.getLevel().getLevel().ordinal());
        }

        List<Long> selectedEmployees = employeesSkillMap.entrySet().stream()
                .map(entry -> Pair.of(entry.getKey(), getSkillSimilarity(projectSkillsVector, entry.getValue())))
                .sorted(Comparator.comparingDouble(Pair::getSecond))
                .limit(params.getTeamSize())
                .map(Pair::getFirst)
                .collect(Collectors.toList());

        return employeeRepository.findAllById(selectedEmployees)
                .stream()
                .map(employeeService::getDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProjectDto saveTeam(Long id, List<EmployeeDto> team) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует проект с id = %s", id)));

        Set<Employee> employees = team.stream()
                .map(item -> employeeRepository.findById(item.getId()).orElse(null))
                .filter(Objects::nonNull)
                .peek(employee -> employee.addProject(project))
                .collect(Collectors.toSet());
        employeeRepository.saveAll(employees);

        project.setTeam(employees);
        projectRepository.save(project);

        return projectMapper.toDto(project);
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

    private Double getSkillSimilarity(List<Double> projectVector, List<Double> employeeVector) {
        Double projectVectorLen = Math.sqrt(projectVector.stream()
                .map(num -> Math.pow(num, 2))
                .mapToDouble(Double::doubleValue)
                .sum());
        projectVector.forEach(item -> item /= projectVectorLen);

        Double employeeVectorLen = Math.sqrt(employeeVector.stream()
                .map(num -> Math.pow(num, 2))
                .mapToDouble(Double::doubleValue)
                .sum());
        employeeVector.forEach(item -> item /= employeeVectorLen);

        Double scalar = 0d;
        for (int i = 0; i < projectVector.size(); i++) {
            scalar += projectVector.get(i) * employeeVector.get(i);
        }

        Double squareDist = 0d;
        for (int i = 0; i < projectVector.size(); i++) {
            squareDist += Math.pow((projectVector.get(i) - employeeVector.get(i)), 2);
        }

        if (projectVectorLen == 0d || employeeVectorLen == 0d) {
            return -1d * Double.POSITIVE_INFINITY;
        }

        return (scalar / (projectVectorLen * employeeVectorLen)) * Math.sqrt(squareDist);
    }
}
