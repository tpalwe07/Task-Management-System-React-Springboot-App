import type { Project } from '../models/project.model';
import { post } from '../api/api';

export const createProject = async (project: Project): Promise<Project> => {
  try {
    const response = await post<Project, Project>('/projects/addProject', project);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};