package com.parkconnect.task_management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.parkconnect.task_management.dto.ProjectDto;
import com.parkconnect.task_management.entity.ProjectEntity;
import com.parkconnect.task_management.exception.ResourceNotFoundException;
import com.parkconnect.task_management.mapper.ProjectMapper;
import com.parkconnect.task_management.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectListRepository;

    public ProjectServiceImpl(ProjectRepository projectListRepository) {
        this.projectListRepository = projectListRepository;
    }

    public ProjectDto addNewProject(ProjectDto projectDto) {
        ProjectEntity projectEntity = new ProjectEntity();
        ProjectEntity newProject  = ProjectMapper.ProjectDetailDtoToProjectEntity(projectDto, projectEntity);
        ProjectEntity result = projectListRepository.save(newProject);
        return ProjectMapper.ProjectEntityToProjectDetailDto(result);
    }

    public List<ProjectDto> getProjects() {
        List<ProjectDto> projectList = projectListRepository.findAll()
                                    .stream()
                                    .map(project -> new ProjectDto(project.getProjectId(), project.getTitle()))
                                    .toList();
        return projectList;
    }

    public ProjectDto getProjectById(Integer projectId) {
        ProjectEntity project =  projectListRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));
    
        return new ProjectDto(project.getProjectId(), project.getTitle(), project.getDescription(), project.getStartDate());
    }

    public void deleteProject(Integer projectId) {
        Boolean isProjectIdExist =  projectListRepository.existsById(projectId);
    
        if(!isProjectIdExist){
            throw new ResourceNotFoundException("Project with id " + projectId +" is Not Found");
        }
        projectListRepository.deleteById(projectId);
    }

    public String updateProject(Integer projectId, ProjectDto projectDetailDto) {
        ProjectEntity existingProject = projectListRepository.findById(projectId).orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));

        projectDetailDto.setProjectId(projectId);
        ProjectEntity filteredProjectDetail = ProjectMapper.ProjectDetailDtoToProjectEntity(projectDetailDto, existingProject);
        projectListRepository.save(filteredProjectDetail);

        return "project added successfully";
    }
}
