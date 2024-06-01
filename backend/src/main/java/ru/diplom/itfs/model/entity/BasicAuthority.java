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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "authorities")
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@EqualsAndHashCode(of = "id")
@Accessors(chain = true)
public class BasicAuthority implements GrantedAuthority {

    @Id
    @Column(name = "authority_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_seq_gen")
    @SequenceGenerator(name = "authority_seq_gen", sequenceName = "authority_seq", allocationSize = 1)
    private Long id;

    @Column(name = "role", unique = true, nullable = false)
    private String role;

    public BasicAuthority(String role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role;
    }
}
