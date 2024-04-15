package ru.diplom.itfs.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.employee.EmployeeUpdateDto;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.service.employee.EmployeeService;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/current")
    public EmployeeDto getCurrentEmployee(@AuthenticationPrincipal User user) {
        return employeeService.getDto(user.getEmployee());
    }

    @PatchMapping("/{id}")
    public EmployeeDto update(@AuthenticationPrincipal User user,
                              @RequestBody EmployeeUpdateDto dto) {
        return null;
    }
}
