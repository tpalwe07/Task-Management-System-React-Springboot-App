package com.parkconnect.task_management.project.service;

import java.util.List;

import com.parkconnect.task_management.project.dto.ProjectDto;

public interface ProjectService {
    
    ProjectDto addNewProject(ProjectDto project);

    List<ProjectDto> getProjects();

    ProjectDto getProjectById(Integer projectId);

    void deleteProject(Integer projectId);

    String updateProject(Integer projectId, ProjectDto projectDetailDto);
}
