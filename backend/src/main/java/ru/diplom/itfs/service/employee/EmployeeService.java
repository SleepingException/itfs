package ru.diplom.itfs.service.employee;

import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.employee.EmployeeUpdateDto;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.enums.SkillLevelEnum;

public interface EmployeeService {
    EmployeeDto getDto(Employee employee);

    EmployeeDto update(EmployeeUpdateDto dto, Employee employee);

    EmployeeDto addSkill(Employee employee, String skillName, SkillLevelEnum level);
}
