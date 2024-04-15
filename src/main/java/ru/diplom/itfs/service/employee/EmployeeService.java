package ru.diplom.itfs.service.employee;

import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.model.entity.Employee;

public interface EmployeeService {
    EmployeeDto getDto(Employee employee);
}
