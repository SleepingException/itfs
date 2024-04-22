package ru.diplom.itfs.mapper;

import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import ru.diplom.itfs.model.entity.BasicAuthority;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.entity.SkillLevel;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.model.enums.UserRoleEnum;

import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Mapper(componentModel = "spring")
public interface UtilsMapper {

    @Named("mapFullName")
    default String mapFullName(Employee employee) {
        if (employee == null) {
            return null;
        }

        return Stream.of(employee.getFirstName(), employee.getSecondName(), employee.getLastName())
                .filter(Objects::nonNull)
                .collect(Collectors.joining(StringUtils.SPACE));
    }

    default UserRoleEnum getAuthorityRole(BasicAuthority authority) {
        if (authority == null) return null;
        return UserRoleEnum.valueOf(authority.getRole());
    }

    default BasicAuthority userRoleToAuthority(UserRoleEnum userRoleEnum) {
        if (userRoleEnum == null) return null;
        return new BasicAuthority().setRole(userRoleEnum.name());
    }

    default Integer getSkillLevelAsNum(SkillLevelEnum skillLevel) {
        return skillLevel.ordinal();
    }

    default String getSkillLevelAsStr(SkillLevelEnum skillLevel) {
        return skillLevel.name();
    }
}
