package com.parkconnect.task_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.parkconnect.task_management.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    
}
