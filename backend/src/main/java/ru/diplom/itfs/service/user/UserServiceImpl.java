package ru.diplom.itfs.service.user;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.diplom.itfs.dto.user.UserCreateDto;
import ru.diplom.itfs.dto.user.UserDto;
import ru.diplom.itfs.dto.user.UserUpdateDto;
import ru.diplom.itfs.exceptions.BadRequest;
import ru.diplom.itfs.mapper.UserMapper;
import ru.diplom.itfs.model.entity.BasicAuthority;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.entity.User;
import ru.diplom.itfs.model.enums.UserRoleEnum;
import ru.diplom.itfs.repository.AuthorityRepository;
import ru.diplom.itfs.repository.EmployeeRepository;
import ru.diplom.itfs.repository.UserRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final AuthorityRepository authorityRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    @Transactional
    public void createDefaultUser() {
        Optional<User> existsUser = userRepository.findByUsername("admin");
        if (existsUser.isPresent()) {
            return;
        }

        Set<BasicAuthority> authorities = Arrays.stream(UserRoleEnum.values())
                .map(role -> authorityRepository.save(new BasicAuthority(role.name())))
                .collect(Collectors.toSet());

        User user = new User()
                .setUsername("admin")
                .setPassword(passwordEncoder.encode("admin"))
                .setEnabled(true)
                .setAuthorities(authorities);

        Employee employee = new Employee()
                .setFirstName("Superuser")
                .setUser(user);
        employeeRepository.save(employee);
    }

    @Override
    @Transactional
    public User create(UserCreateDto userCreateDto) {
        Optional<User> existUser = userRepository.findByUsername(userCreateDto.getUsername());
        if (existUser.isPresent()) {
            throw new BadRequest("Пользователь с таким логином уже существует");
        }

        User user = new User()
                .setUsername(userCreateDto.getUsername())
                .setPassword(passwordEncoder.encode(userCreateDto.getPassword()))
                .setEnabled(true)
                .setAuthorities(getAuthoritiesByRoles(List.of(UserRoleEnum.ROLE_EMPLOYEE)));

        Employee employee = new Employee()
                .setPhone(userCreateDto.getPhone())
                .setFirstName(userCreateDto.getFirstName())
                .setSecondName(userCreateDto.getSecondName());
        employee.setUser(user);

        userRepository.save(user);
        employeeRepository.save(employee);

        return user;
    }

    @Override
    public UserDto toDto(User user) {
        return userMapper.toDto(user);
    }

    @Override
    public List<UserDto> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .toList();
    }

    @Override
    public UserDto updateUser(Long userId, UserUpdateDto dto) {
        User user = userRepository.getReferenceById(userId);
        userMapper.update(dto, user);
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    @Override
    public void delete(Long userId) {
        userRepository.deleteById(userId);
    }

    private Set<BasicAuthority> getAuthoritiesByRoles(List<UserRoleEnum> rolesEnum) {
        return authorityRepository.getAllByRoleIn(rolesEnum.stream().map(UserRoleEnum::name).toList());
    }
}
