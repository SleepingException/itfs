package ru.diplom.itfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.diplom.itfs.model.entity.SkillLevel;
import ru.diplom.itfs.model.enums.SkillLevelEnum;

public interface SkillLevelRepository extends JpaRepository<SkillLevel, Long> {

    SkillLevel getSkillLevelByLevel(SkillLevelEnum level);
}
