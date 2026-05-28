package com.parkconnect.project_service.controller;

import java.util.List;

import com.parkconnect.project_service.dto.ApiResponseDto;
import com.parkconnect.project_service.dto.ProjectDto;
import com.parkconnect.project_service.publisher.ProjectEventPublisher;
import com.parkconnect.project_service.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/api/projects")
@CrossOrigin("*")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    public List<ProjectDto> getProjects(@RequestHeader("X-User-Id") String userId){
        return projectService.getProjects( userId);
    }
    
    @PostMapping("/addProject")
    public ResponseEntity<ApiResponseDto<ProjectDto>> addNewProject(
            @RequestBody ProjectDto project, @RequestHeader(value = "X-User-Id", required = false) String userId) {

        ProjectDto savedProject = projectService.addNewProject(project, userId);

        ApiResponseDto<ProjectDto> response = new ApiResponseDto<ProjectDto>
                                                  (201,
                                                   "Project created successfully", 
                                                   savedProject);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ApiResponseDto<ProjectDto>> updateProject(
            @PathVariable Integer projectId,
            @RequestBody ProjectDto projectDto,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {

        ProjectDto updated = projectService.updateProject(projectId, projectDto, userId);

        return ResponseEntity.ok(new ApiResponseDto<>(200, "Project updated successfully", updated));
    }

    @GetMapping("/{projectId}")
    public ProjectDto getProjectById(@PathVariable Integer projectId, @RequestHeader("X-User-Id") String userId) {
        ProjectDto project = projectService.getProjectById(projectId, userId);
        if (project == null) {
            return null;
        }
        return project;
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ApiResponseDto<Integer>> deleteProject(
            @PathVariable Integer projectId,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {

        projectService.deleteProject(projectId, userId);

        return ResponseEntity.ok(new ApiResponseDto<>(200, "Project deleted successfully", projectId));
    }
}
