package com.parkconnect.task_management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.parkconnect.task_management.dto.ProjectDetailDto;
import com.parkconnect.task_management.dto.ProjectDto;
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

    public List<ProjectDto> getProjects() {
        List<ProjectDto> projectList = projectListRepository.findAll()
                                    .stream()
                                    .map(project -> new ProjectDto(project.getProjectId(), project.getTitle()))
                                    .toList();
        return projectList;
    }

    public ProjectDetailDto getProjectById(Integer projectId) {
        Project project =  projectListRepository.findById(projectId).orElse(null);
        if (project != null) {
            return new ProjectDetailDto(project.getProjectId(), project.getTitle(), project.getDescription(), project.getStartDate());
        }
        return null;
    }
}
