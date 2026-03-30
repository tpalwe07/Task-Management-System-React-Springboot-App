package com.parkconnect.task_management.service;

import java.util.List;

import com.parkconnect.task_management.dto.ProjectDetailDto;
import com.parkconnect.task_management.dto.ProjectDto;
import com.parkconnect.task_management.entity.Project;

public interface ProjectService {
    
    Project addNewProject(ProjectDetailDto project);

    List<ProjectDto> getProjects();

    ProjectDetailDto getProjectById(Integer projectId);

    void deleteProject(Integer projectId);

    String updateProject(Integer projectId, ProjectDetailDto projectDetailDto);
}
