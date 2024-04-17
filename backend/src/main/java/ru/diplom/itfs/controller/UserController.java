package ru.diplom.itfs.controller;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.user.UserCreateDto;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.service.employee.EmployeeService;
import ru.diplom.itfs.service.user.UserService;

@Tag(name = "API Пользователей")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EmployeeService employeeService;

    @PostMapping("/register")
    @Operation(description = "Регистрация пользователя")
    public void register(@RequestBody UserCreateDto createDto) {
        userService.create(createDto);
    }

    @Hidden
    @PostMapping("/post-auth")
    public EmployeeDto afterAuth(@AuthenticationPrincipal User user) {
        return employeeService.getDto(user.getEmployee());
    }
}
