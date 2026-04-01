package com.parkconnect.task_management.mapper;

import com.parkconnect.task_management.config.TenantContext;
import com.parkconnect.task_management.dto.ProjectDto;
import com.parkconnect.task_management.entity.ProjectEntity;

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
