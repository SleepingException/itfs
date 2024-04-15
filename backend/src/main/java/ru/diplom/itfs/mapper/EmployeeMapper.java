package ru.diplom.itfs.mapper;

import org.mapstruct.Mapper;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.model.entity.Employee;

@Mapper(componentModel = "spring", uses = {SkillMapper.class})
public interface EmployeeMapper {

    EmployeeDto toDto(Employee employee);
}
