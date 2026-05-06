export interface Task {
  taskId?: number;
  title?: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'to-do' | 'cancelled' | 'review';
  projectId?: number;
  priority?: number;
  tenantId?: string;
}

export const priority = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

export const status = {
  pending: 'pending',
  inProgress: 'in-progress',
  completed: 'completed',
  toDo: 'to-do',
  cancelled: 'cancelled',
  review: 'review'
};
