import type { Project } from '../models/project.model';
import { get, post } from '../api/api';

export const createProject = async (project: Project): Promise<Project> => {
  try {
    const response = await post<Project, Project>('/projects/addProject', project);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await get<Project[], void>('/projects/');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};
