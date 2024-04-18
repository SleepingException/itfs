package ru.diplom.itfs.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.employee.EmployeeUpdateDto;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.service.employee.EmployeeService;

@Tag(name = "API Сотрудников")
@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/current")
    public EmployeeDto getCurrentEmployee(@AuthenticationPrincipal User user) {
        return employeeService.getDto(user.getEmployee());
    }

    @PatchMapping("/update")
    public EmployeeDto update(@AuthenticationPrincipal User user,
                              @RequestBody EmployeeUpdateDto dto) {
        return employeeService.update(dto, user.getEmployee());
    }

    @PatchMapping("/skills/add")
    public EmployeeDto addSkill(@AuthenticationPrincipal User user,
                                @RequestParam("skillName") String skillName,
                                @RequestParam("level")SkillLevelEnum level) {
        return employeeService.addSkill(user.getEmployee(), skillName, level);
    }
}
