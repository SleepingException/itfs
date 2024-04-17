package ru.diplom.itfs.service.skills;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import ru.diplom.itfs.dto.skill.SkillCreateDto;
import ru.diplom.itfs.dto.skill.SkillDto;
import ru.diplom.itfs.dto.skill.SkillLevelDto;
import ru.diplom.itfs.mapper.SkillMapper;
import ru.diplom.itfs.model.entity.Skill;
import ru.diplom.itfs.model.entity.SkillLevel;
import ru.diplom.itfs.model.enums.SkillLevelEnum;
import ru.diplom.itfs.model.enums.SkillType;
import ru.diplom.itfs.repository.SkillLevelRepository;
import ru.diplom.itfs.repository.SkillRepository;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillLevelRepository skillLevelRepository;
    private final SkillRepository skillRepository;
    private final SkillMapper mapper;

    @PostConstruct
    @Transactional
    public void initSkillLevels() {
        if (!skillLevelRepository.findAll().isEmpty()) {
            return;
        }

        List<SkillLevel> levels = Arrays.stream(SkillLevelEnum.values())
                .map(item -> new SkillLevel()
                        .setLevel(item)
                        .setLevelName(item.getLevelName())
                        .setDescription(item.getDescription()))
                .collect(Collectors.toList());

        skillLevelRepository.saveAll(levels);
    }

    @Override
    public SkillDto create(SkillCreateDto dto) {
        List<Skill> skillsToSave = skillLevelRepository.findAll().stream()
                .map(level -> {
                    Skill skill = mapper.toEntity(dto);
                    skill.setLevel(level);

                    return skill;
                }).toList();

        skillRepository.saveAll(skillsToSave);

        return mapper.toDto(skillsToSave.get(0));
    }

    @Override
    public List<SkillDto> getSkills() {
        return mapSkills(skillRepository.findAll());
    }

    @Override
    public List<SkillDto> getSkillsByType(SkillType type) {
        return mapSkills(skillRepository.getSkillsByType(type));
    }

    @Override
    public List<SkillLevelDto> getLevels() {
        return skillLevelRepository.findAll().stream()
                .map(mapper::levelToDto)
                .collect(Collectors.toList());
    }

    private List<SkillDto> mapSkills(List<Skill> skills) {
        return skills.stream()
                .map(mapper::toDto)
                .distinct()
                .toList();
    }
}
