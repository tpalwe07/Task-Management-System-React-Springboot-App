package com.parkconnect.project_service.mapper;

import com.parkconnect.project_service.dto.ProjectDto;
import com.parkconnect.project_service.entity.ProjectEntity;

public class ProjectMapper {

    /**
     * Maps fields from a ProjectDto into an existing ProjectEntity.
     * Existing entity is passed in so JPA can track it correctly for updates.
     * Only non-null fields are mapped — prevents accidental overwrites on partial updates.
     */
    public static ProjectEntity dtoToEntity(ProjectDto dto, ProjectEntity entity) {
        if (dto.getTitle() != null) {
            entity.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            entity.setDescription(dto.getDescription());
        }
        if (dto.getStartDate() != null) {
            entity.setStartDate(dto.getStartDate());
        }
        // projectId is managed by JPA — never set it from DTO manually
        // createdByUserId is set in the service layer — not here
        return entity;
    }

    /**
     * Full entity → DTO mapping (used after save to return complete data).
     */
    public static ProjectDto entityToDto(ProjectEntity entity) {
        return ProjectDto.builder()
                .projectId(entity.getProjectId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .startDate(entity.getStartDate())
                .createdByUserId(entity.getCreatedByUserId())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    /**
     * Lightweight mapping — only id and title.
     * Used for list responses to avoid sending full payload.
     */
    public ProjectDto entityToSummaryDto(ProjectEntity entity) {
        return ProjectDto.builder()
                .projectId(entity.getProjectId())
                .title(entity.getTitle())
                .build();
    }
}
