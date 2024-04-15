package ru.diplom.itfs.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.NullValuePropertyMappingStrategy;
import ru.diplom.itfs.dto.user.UserDto;
import ru.diplom.itfs.dto.user.UserUpdateDto;
import ru.diplom.itfs.model.entity.User;

@Mapper(componentModel = "spring", uses = {UtilsMapper.class})
public interface UserMapper {

    @Mapping(source = "employee", target = "fullName", qualifiedByName = "mapFullName")
    @Mapping(source = "authorities", target = "roles")
    UserDto toDto(User user);

    @Mapping(source = "dto.roles", target = "user.authorities", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "dto.enabled", target = "user.enabled", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UserUpdateDto dto, @MappingTarget User user);
}
