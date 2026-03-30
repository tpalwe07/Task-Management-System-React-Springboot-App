import type { Project } from '../models/project.model';
import { deleteFn, get, post, put } from '../api/api';

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
    const response = await get<Project[], void>('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (projectId: number): Promise<Project> => {
  try {
    const response = await get<Project, void>(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
};

export const deleteProjectById = async (projectId: number): Promise<void> => {
  try {
    await deleteFn<void>(`/projects/${projectId}`);
  } catch (error) {
    console.error('Error deleting project by ID:', error);
    throw error;
  }
};

export const editProjectById = async (projectId: number, updatedProject: Project): Promise<Project> => {
  try {
    const response = await put<Project, Project>(`/projects/${projectId}`, updatedProject);
    return response.data;
  } catch (error) {
    console.error('Error editing project by ID:', error);
    throw error;
  }
};
