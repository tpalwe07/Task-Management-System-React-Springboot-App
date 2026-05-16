package com.parkconnect.project_service.service;

import com.parkconnect.project_service.dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    
    ProjectDto addNewProject(ProjectDto project);

    List<ProjectDto> getProjects();

    ProjectDto getProjectById(Integer projectId);

    void deleteProject(Integer projectId);

    String updateProject(Integer projectId, ProjectDto projectDetailDto);
}
