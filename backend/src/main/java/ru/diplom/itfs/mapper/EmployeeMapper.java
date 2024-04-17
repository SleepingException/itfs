package ru.diplom.itfs.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import ru.diplom.itfs.dto.employee.EmployeeDto;
import ru.diplom.itfs.dto.employee.EmployeeUpdateDto;
import ru.diplom.itfs.dto.skill.EmployeeSkillDto;
import ru.diplom.itfs.dto.skill.SkillDto;
import ru.diplom.itfs.model.entity.Employee;
import ru.diplom.itfs.model.entity.Skill;
import ru.diplom.itfs.model.enums.SkillType;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SkillMapper.class}, imports = {SkillMapper.class})
public abstract class EmployeeMapper {

    @Autowired
    protected SkillMapper skillMapper;

    public abstract EmployeeDto toDto(Employee employee);

    @Mapping(source = "firstName", target = "firstName",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "secondName", target = "secondName",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "lastName", target = "lastName",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "phone", target = "phone",
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract void update(EmployeeUpdateDto dto, @MappingTarget Employee employee);

    @AfterMapping
    protected void afterToDto(Employee employee, @MappingTarget EmployeeDto dto) {
        List<EmployeeSkillDto> hardSkills = employee.getSkills().stream()
                .filter(skill -> SkillType.HARD.equals(skill.getType()))
                .map(skillMapper::toEmployeeSkill)
                .toList();

        List<EmployeeSkillDto> softSkills = employee.getSkills().stream()
                .filter(skill -> SkillType.SOFT.equals(skill.getType()))
                .map(skillMapper::toEmployeeSkill)
                .toList();

        dto.setHardSkills(hardSkills).setSoftSkills(softSkills);
    }
}
