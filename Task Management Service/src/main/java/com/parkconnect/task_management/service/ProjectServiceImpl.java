package com.parkconnect.task_management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.parkconnect.task_management.entity.Project;
import com.parkconnect.task_management.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectListRepository;

    public ProjectServiceImpl(ProjectRepository projectListRepository) {
        this.projectListRepository = projectListRepository;
    }

    public Project addNewProject(Project project) {
        return projectListRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectListRepository.findAll();
    }

    public Project getProjectById(Integer projectId) {
        return projectListRepository.findById(projectId).orElse(null);
    }
}
