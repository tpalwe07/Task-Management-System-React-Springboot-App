package com.parkconnect.project_service.service;

import java.util.List;

import com.parkconnect.project_service.dto.ProjectDto;
import com.parkconnect.project_service.entity.ProjectEntity;
import com.parkconnect.project_service.event.EventType;
import com.parkconnect.project_service.exception.UnauthorizedException;
import com.parkconnect.project_service.mapper.ProjectMapper;
import com.parkconnect.project_service.publisher.ProjectEventPublisher;
import com.parkconnect.project_service.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.parkconnect.auth_service.exception.ResourceNotFoundException;

@Slf4j
@Service
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectRepository;
    private final ProjectEventPublisher eventPublisher;

    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectEventPublisher eventPublisher) {
        this.projectRepository = projectRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    @Transactional
    public ProjectDto addNewProject(ProjectDto projectDto, String userId) {
        log.info("Creating new project for userId: {}", userId);

        ProjectEntity entity = new ProjectEntity();
        entity.setCreatedByUserId(userId);           // assign to logged-in user
        entity.setLastModifiedByUserId(userId);

        ProjectEntity mapped  = ProjectMapper.dtoToEntity(projectDto, entity);
        ProjectEntity saved   = projectRepository.save(mapped);
        ProjectDto    result  = ProjectMapper.entityToDto(saved);

        eventPublisher.publishProjectCreated(result, userId);
        log.info("Project created with id: {}", saved.getProjectId());
        return result;
    }

    @Override
    @Transactional
    public List<ProjectDto> getProjects(String userId) {
        log.info("Fetching all projects for userId: {}", userId);

        List<ProjectDto> result = projectRepository.findByCreatedByUserId(userId)
                .stream()
                .map(p -> new ProjectDto(p.getProjectId(), p.getTitle()))
                .toList();
        eventPublisher.publishProjectCreated(result.get(0), userId);
        // each user only sees their own projects
        return result;
    }

    @Override
    @Transactional
    public ProjectDto getProjectById(Integer projectId, String userId) {
        log.info("Fetching project id: {} for userId: {}", projectId, userId);

        ProjectEntity project = findProjectAndVerifyOwner(projectId, userId);
        return new ProjectDto(
                project.getProjectId(),
                project.getTitle(),
                project.getDescription(),
                project.getStartDate(),
                project.getCreatedByUserId(),
                project.getLastModifiedByUserId(),
                project.getCreatedAt(),
                project.getUpdatedAt()

        );
    }

    @Override
    @Transactional
    public ProjectDto updateProject(Integer projectId, ProjectDto projectDto, String userId) {
        log.info("Updating project id: {} for userId: {}", projectId, userId);

        ProjectEntity existing = findProjectAndVerifyOwner(projectId, userId);
        existing.setLastModifiedByUserId(userId);

        projectDto.setProjectId(projectId);
        ProjectEntity updated = ProjectMapper.dtoToEntity(projectDto, existing);
        ProjectEntity saved   = projectRepository.save(updated);
        ProjectDto    result  = ProjectMapper.entityToDto(saved);

        eventPublisher.publishProjectUpdated(result, userId);
        log.info("Project updated with id: {}", projectId);
        return result;
    }

    @Override
    @Transactional
    public void deleteProject(Integer projectId, String userId) {
        log.info("Deleting project id: {} for userId: {}", projectId, userId);

        findProjectAndVerifyOwner(projectId, userId);   // throws if not found or not owner
        projectRepository.deleteById(projectId);

        eventPublisher.publishProjectDeleted(projectId, userId);
        log.info("Project deleted with id: {}", projectId);
    }

    // ── private helpers ──────────────────────────────────────────────────────

    /**
     * Fetches the project and ensures the requesting user is the owner.
     * Throws ResourceNotFoundException if the project doesn't exist.
     * Throws UnauthorizedException if the user doesn't own it.
     */
    private ProjectEntity findProjectAndVerifyOwner(Integer projectId, String userId) {
        ProjectEntity project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Project with id " + projectId + " not found"));

        if (!project.getCreatedByUserId().equals(userId)) {
            log.warn("Unauthorized access: userId {} tried to access project {}", userId, projectId);
            throw new UnauthorizedException(
                    "You do not have permission to access project " + projectId);
        }
        return project;
    }
}
