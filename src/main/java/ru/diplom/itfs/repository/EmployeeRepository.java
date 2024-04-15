package ru.diplom.itfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.diplom.itfs.model.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
