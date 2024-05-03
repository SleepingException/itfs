package ru.diplom.itfs.mapper;

import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import ru.diplom.itfs.model.entity.BasicAuthority;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.model.enums.UserRoleEnum;
import ru.diplom.itfs.repository.AuthorityRepository;

import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Mapper(componentModel = "spring")
public abstract class UtilsMapper {

    @Autowired
    AuthorityRepository authorityRepository;

    @Named("mapFullName")
    public String mapFullName(Employee employee) {
        if (employee == null) {
            return null;
        }

        return Stream.of(employee.getFirstName(), employee.getSecondName(), employee.getLastName())
                .filter(Objects::nonNull)
                .collect(Collectors.joining(StringUtils.SPACE));
    }

    public UserRoleEnum getAuthorityRole(BasicAuthority authority) {
        if (authority == null) return null;
        return UserRoleEnum.valueOf(authority.getRole());
    }

    public BasicAuthority userRoleToAuthority(UserRoleEnum userRoleEnum) {
        if (userRoleEnum == null) return null;
        return authorityRepository.getByRole(userRoleEnum.name());
    }

    public Integer getSkillLevelAsNum(SkillLevelEnum skillLevel) {
        return skillLevel.ordinal();
    }

    public String getSkillLevelAsStr(SkillLevelEnum skillLevel) {
        return skillLevel.name();
    }
}
