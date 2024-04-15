package ru.diplom.itfs.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.diplom.itfs.model.enums.SkillLevelEnum;

@Entity
@Table(name = "skill_levels")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SkillLevel {

    @Id
    @Column(name = "skill_level_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skill_level_seq_gen")
    @SequenceGenerator(name = "skill_level_seq_gen", sequenceName = "skill_level_seq", allocationSize = 1)
    private Long id;

    @Column(name = "level", nullable = false)
    private SkillLevelEnum level;

    @Column(name = "description")
    private String description;
}
