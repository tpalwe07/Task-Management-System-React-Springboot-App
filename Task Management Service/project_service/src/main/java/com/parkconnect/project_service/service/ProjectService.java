package com.parkconnect.project_service.service;

import com.parkconnect.project_service.dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    
    ProjectDto addNewProject(ProjectDto project, String userId);

    List<ProjectDto> getProjects(String userId);

    ProjectDto getProjectById(Integer projectId, String userId);

    void deleteProject(Integer projectId,  String userId);

    ProjectDto updateProject(Integer projectId, ProjectDto projectDetailDto, String userId);
}
