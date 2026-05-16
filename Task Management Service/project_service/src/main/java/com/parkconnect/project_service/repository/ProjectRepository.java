package com.parkconnect.project_service.repository;

import com.parkconnect.project_service.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    
}
