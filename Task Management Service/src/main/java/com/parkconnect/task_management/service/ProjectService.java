package com.parkconnect.task_management.service;

import java.util.List;

import com.parkconnect.task_management.entity.Project;

public interface ProjectService {
    
    Project addNewProject(Project project);

    List<Project> getAllProjects();

    Project getProjectById(Integer projectId);
}
