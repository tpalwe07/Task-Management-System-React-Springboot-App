package com.parkconnect.task_management.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Integer projectId;
    private String title; 
    private String description;
    private String startDate;

    public ProjectDto(Integer projectId, String title){
        this.projectId = projectId;
        this.title = title;
    }
}
