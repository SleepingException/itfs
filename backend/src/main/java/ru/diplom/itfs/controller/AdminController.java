package ru.diplom.itfs.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.user.UserDto;
import ru.diplom.itfs.dto.user.UserUpdateDto;
import ru.diplom.itfs.model.enums.UserRoleEnum;
import ru.diplom.itfs.service.user.UserService;

import java.util.List;

@Tag(name = "API Администратора")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    private final UserService userService;

    @GetMapping("/roles")
    public List<UserRoleEnum> getRoles() {
        return List.of(UserRoleEnum.values());
    }

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @PatchMapping("/users/{userId}")
    public UserDto update(@PathVariable Long userId,
                          @RequestBody UserUpdateDto dto) {
        return userService.updateUser(userId, dto);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.delete(userId);
    }
}
