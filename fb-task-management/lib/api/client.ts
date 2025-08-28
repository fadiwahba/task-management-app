import { Task, TaskInput, TaskFilters } from "@/types/task";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-api.com/api"
    : "http://localhost:3000/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new ApiError(
      errorText || response.statusText,
      response.status,
      response.statusText
    );
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export const tasksApi = {
  // Get all tasks with optional filters
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const searchParams = new URLSearchParams();

    if (filters?.status) {
      searchParams.append("status", filters.status);
    }
    if (filters?.priority) {
      searchParams.append("priority", filters.priority);
    }
    if (filters?.dueDate) {
      searchParams.append("dueDate", filters.dueDate);
    }

    const url = `${API_BASE_URL}/tasks${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const response = await fetch(url);
    return handleResponse<Task[]>(response);
  },

  // Get a single task by ID
  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    return handleResponse<Task>(response);
  },

  // Create a new task
  async createTask(taskInput: TaskInput): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInput),
    });
    return handleResponse<Task>(response);
  },

  // Update an existing task
  async updateTask(id: string, taskInput: TaskInput): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInput),
    });
    return handleResponse<Task>(response);
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    return handleResponse<void>(response);
  },
};
