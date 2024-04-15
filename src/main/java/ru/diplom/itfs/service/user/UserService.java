package ru.diplom.itfs.service.user;

import ru.diplom.itfs.dto.user.UserCreateDto;
import ru.diplom.itfs.dto.user.UserDto;
import ru.diplom.itfs.dto.user.UserUpdateDto;
import ru.diplom.itfs.model.entity.User;

import java.util.List;

public interface UserService {

    User create(UserCreateDto userCreateDto);

    List<UserDto> getUsers();

    UserDto updateUser(Long userId, UserUpdateDto dto);

    void delete(Long userId);
}
