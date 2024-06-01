package ru.diplom.itfs.service.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.employee.EmployeeUpdateDto;
import ru.diplom.itfs.exceptions.BadRequest;
import ru.diplom.itfs.mapper.EmployeeMapper;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.entity.Skill;
import ru.diplom.itfs.model.entity.SkillLevel;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.repository.EmployeeRepository;
import ru.diplom.itfs.repository.SkillLevelRepository;
import ru.diplom.itfs.repository.SkillRepository;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeMapper employeeMapper;
    private final EmployeeRepository employeeRepository;
    private final SkillRepository skillRepository;
    private final SkillLevelRepository skillLevelRepository;

    @Override
    public EmployeeDto getDto(Employee employee) {
        Employee employeeEntity = employeeRepository.findById(employee.getId())
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует сотрудник с id = %s", employee.getId())));
        return employeeMapper.toDto(employeeEntity);
    }

    @Override
    public EmployeeDto update(EmployeeUpdateDto dto, Employee employee) {
        Employee employeeEntity = employeeRepository.findById(employee.getId())
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует сотрудник с id = %s", employee.getId())));

        employeeMapper.update(dto, employeeEntity);
        employeeRepository.save(employeeEntity);
        return employeeMapper.toDto(employeeEntity);
    }

    @Override
    @Transactional
    public EmployeeDto addSkill(Employee employee, String skillName, SkillLevelEnum level) {
        Employee employeeEntity = employeeRepository.findById(employee.getId())
                .orElseThrow(() -> new BadRequest(String.format("Отсутствует сотрудник с id = %s", employee.getId())));

        SkillLevel skillLevel = skillLevelRepository.getSkillLevelByLevel(level);
        Skill skill = skillRepository.getSkillByNameAndLevel(skillName, skillLevel)
                .orElseThrow(() -> new BadRequest(String.format("Не найдена компетенция %s", skillName)));

        employeeEntity.getSkills().stream()
                .filter(item -> item.isTheSameSkill(skill))
                .findAny()
                .ifPresent(value -> employee.getSkills().remove(value));

        employeeEntity.addSkill(skill);
        employeeRepository.save(employeeEntity);

        return employeeMapper.toDto(employeeEntity);
    }
}
