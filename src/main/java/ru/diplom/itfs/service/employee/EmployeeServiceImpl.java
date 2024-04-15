package ru.diplom.itfs.service.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.mapper.EmployeeMapper;
import ru.diplom.itfs.model.entity.Employee;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeDto getDto(Employee employee) {
        return employeeMapper.toDto(employee);
    }
}
