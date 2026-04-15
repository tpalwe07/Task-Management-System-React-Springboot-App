import { type Task } from '../models/task.model';
import { post } from '../api/api';

export const createTask = async (task: Task, projectId: number) => {
  try {
    const response = await post<Task, Task>(`${projectId}/addTask`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
