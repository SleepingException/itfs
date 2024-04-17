package ru.diplom.itfs.dto.project;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ProjectUpdateDto {

    private String name;

    private String description;
}
