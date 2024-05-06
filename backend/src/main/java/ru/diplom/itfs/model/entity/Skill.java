package ru.diplom.itfs.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ru.diplom.itfs.model.enums.SkillType;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "skills")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Skill {

    @Id
    @Column(name = "skill_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "skill_id_seq_gen")
    @SequenceGenerator(name = "skill_id_seq_gen", sequenceName = "skill_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "type")
    private SkillType type;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "skill_level_id")
    private SkillLevel level;

    @ToString.Exclude
    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Set<Employee> employees;

    public void addEmployee(Employee employee) {
        if (employees == null) {
            employees = new HashSet<>();
        }
        employees.add(employee);
    }
}
