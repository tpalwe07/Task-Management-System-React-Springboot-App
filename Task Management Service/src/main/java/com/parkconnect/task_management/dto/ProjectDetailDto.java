package com.parkconnect.task_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProjectDetailDto {
    private Integer projectId;
    private String title; 
    private String description;
    private String startDate;
}
