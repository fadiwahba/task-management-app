// Types generated from OpenAPI spec
export type TaskStatus = 'pending' | 'in progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface TaskInput {
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  priority?: TaskPriority;
  status: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export interface TaskSortOptions {
  field: 'title' | 'dueDate' | 'priority' | 'status' | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page?: number;
  limit?: number;
}