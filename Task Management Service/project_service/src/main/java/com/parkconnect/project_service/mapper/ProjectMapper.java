package com.parkconnect.project_service.mapper;

import com.parkconnect.project_service.config.TenantContext;
import com.parkconnect.project_service.dto.ProjectDto;
import com.parkconnect.project_service.entity.ProjectEntity;

public class ProjectMapper {
    
    public static ProjectEntity ProjectDetailDtoToProjectEntity(ProjectDto projectDto, ProjectEntity projectEntity){
        if (projectDto.getProjectId() != null) projectEntity.setProjectId(projectDto.getProjectId());
        if (projectDto.getTitle() != null) projectEntity.setTitle((projectDto.getTitle()));
        if (projectDto.getDescription()!= null) projectEntity.setDescription((projectDto.getDescription()));
        if (projectDto.getStartDate() != null) projectEntity.setStartDate((projectDto.getStartDate()));
        projectEntity.setTenantId(TenantContext.DEFAULT_TENANT);

        return projectEntity;
    }

    public static ProjectDto ProjectEntityToProjectDetailDto(ProjectEntity projectEntity){
        ProjectDto projectDto = new ProjectDto(projectEntity.getProjectId(),projectEntity.getTitle(),projectEntity.getDescription(),projectEntity.getStartDate());
        
        return projectDto;
    }
}
