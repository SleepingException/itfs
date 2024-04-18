package ru.diplom.itfs.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.diplom.itfs.dto.skill.SkillCreateDto;
import ru.diplom.itfs.dto.skill.SkillDto;
import ru.diplom.itfs.dto.skill.SkillLevelDto;
import ru.diplom.itfs.model.enums.SkillType;
import ru.diplom.itfs.service.skills.SkillService;

import java.util.List;

@Tag(name = "API Компетенций")
@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SkillController {

    private final SkillService service;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    @PostMapping("/create")
    public SkillDto createSkill(@RequestBody SkillCreateDto dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<SkillDto> getSkills() {
        return service.getSkills();
    }

    @GetMapping("/{type}")
    public List<SkillDto> getSkillsByType(@PathVariable SkillType type) {
        return service.getSkillsByType(type);
    }

    @GetMapping("/levels")
    public List<SkillLevelDto> getSkillLevels() {
        return service.getLevels();
    }
}
