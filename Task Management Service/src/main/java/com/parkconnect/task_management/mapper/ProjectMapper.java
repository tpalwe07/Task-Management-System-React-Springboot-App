package com.parkconnect.task_management.mapper;

import com.parkconnect.task_management.dto.ProjectDetailDto;
import com.parkconnect.task_management.entity.Project;

public class ProjectMapper {
    
    public static Project ProjectDetailDtoToProjectEntity(ProjectDetailDto projectDto){
        Project project = new Project();
        project.setProjectId(projectDto.getProjectId());
        project.setTitle((projectDto.getTitle()));
        project.setDescription((projectDto.getDescription()));
        project.setStartDate((projectDto.getStartDate()));

        return project;
    }

    public static ProjectDetailDto ProjectEntityToProjectDetailDto(Project project){
        ProjectDetailDto projectDto = new ProjectDetailDto(project.getProjectId(),project.getTitle(),project.getDescription(),project.getStartDate());
        
        return projectDto;
    }
}
