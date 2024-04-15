package ru.diplom.itfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.diplom.itfs.model.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
