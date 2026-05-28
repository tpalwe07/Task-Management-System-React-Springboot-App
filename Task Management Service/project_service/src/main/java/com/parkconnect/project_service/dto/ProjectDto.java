package com.parkconnect.project_service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)   // hides null fields in JSON response
public class ProjectDto {

    private Integer projectId;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be under 100 characters")
    private String title;

    @Size(max = 500, message = "Description must be under 500 characters")
    private String description;

    private String startDate;

    private String createdByUserId;

    private String lastModifiedByUserId;// shown in response so frontend knows the owner

    private LocalDateTime createdAt;  // read-only — set by DB

    private LocalDateTime updatedAt;

    public ProjectDto(Integer projectId, String title){
        this.projectId = projectId;
        this.title = title;
    }
}
