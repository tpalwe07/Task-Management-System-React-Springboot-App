package com.parkconnect.task_management.service;

import java.util.List;

import com.parkconnect.task_management.dto.ProjectDto;

public interface ProjectService {
    
    ProjectDto addNewProject(ProjectDto project);

    List<ProjectDto> getProjects();

    ProjectDto getProjectById(Integer projectId);

    void deleteProject(Integer projectId);

    String updateProject(Integer projectId, ProjectDto projectDetailDto);
}
