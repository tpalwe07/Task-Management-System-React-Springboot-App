package com.parkconnect.task_management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parkconnect.task_management.dto.ApiResponseDto;
import com.parkconnect.task_management.dto.ProjectDto;
import com.parkconnect.task_management.service.ProjectService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("v1/api/projects")
@CrossOrigin("*")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    public List<ProjectDto> getProjects(){
        return projectService.getProjects();
    }
    
    @PostMapping("/addProject")
    public ResponseEntity<ApiResponseDto<ProjectDto>> addNewProject(@RequestBody ProjectDto project) {
        ProjectDto savedProject = projectService.addNewProject(project);

        ApiResponseDto<ProjectDto> response = new ApiResponseDto<ProjectDto>
                                                  (200,
                                                   "Project created successfully", 
                                                   savedProject);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ProjectDto getProjectById(@PathVariable Integer projectId) {
        ProjectDto project = projectService.getProjectById(projectId);
        if (project == null) {
            return null;
        }
        return project;
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ApiResponseDto<Integer>> deleteProject(@PathVariable Integer projectId) {
        projectService.deleteProject(projectId);

        ApiResponseDto<Integer> response = new ApiResponseDto<Integer>(200, "Project deleted successfully", projectId);
        return new ResponseEntity<>(response , HttpStatus.OK);
    }

    @PutMapping("/{projectId}")
    public String updateProject(@PathVariable Integer projectId, @RequestBody ProjectDto projectDto){

        projectService.updateProject(projectId, projectDto);
        return "project updated Successfully";
    }
    
}
