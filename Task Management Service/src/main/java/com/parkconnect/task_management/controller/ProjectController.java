package com.parkconnect.task_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkconnect.task_management.dto.ProjectDetailDto;
import com.parkconnect.task_management.dto.ProjectDto;
import com.parkconnect.task_management.entity.Project;
import com.parkconnect.task_management.service.ProjectService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("v1/api/projects")
@CrossOrigin("*")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/")
    public List<ProjectDto> getProjects(){
        return projectService.getProjects();
    }
    
    @PostMapping("addProject")
    public String addNewProject(@RequestBody Project project) {
        projectService.addNewProject(project);
        return "Project added successfully";
    }

    @GetMapping("/{projectId}")
    public ProjectDetailDto getProjectById(@PathVariable Integer projectId) {
        ProjectDetailDto project = projectService.getProjectById(projectId);
        if (project == null) {
            return null;
        }
        return project;
    }
}
