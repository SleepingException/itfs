package ru.diplom.itfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.diplom.itfs.model.entity.Skill;
import ru.diplom.itfs.model.entity.SkillLevel;
import ru.diplom.itfs.model.enums.SkillType;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> getSkillByNameAndLevel(String name, SkillLevel skillLevel);

    List<Skill> getSkillsByType(SkillType type);
}
