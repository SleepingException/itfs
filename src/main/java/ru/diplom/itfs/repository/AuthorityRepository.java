package ru.diplom.itfs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.diplom.itfs.model.entity.BasicAuthority;

import java.util.Collection;
import java.util.Set;

public interface AuthorityRepository extends JpaRepository<BasicAuthority, Long> {

    BasicAuthority getByRole(String role);

    Set<BasicAuthority> getAllByRoleIn(Collection<String> roles);
}
