package com.parkconnect.task_management.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkconnect.task_management.entity.Project;
import com.parkconnect.task_management.service.ProjectService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("addProject")
    public String addNewProject(@RequestBody Project project) {

        projectService.addNewProject(project);
        return "Project added successfully";
    }
    
}
