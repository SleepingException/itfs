package ru.diplom.itfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.diplom.itfs.model.entity.Project;

import java.util.Set;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Set<Project> findAllByAuthorId(Long authorId);
}
