import { tasksApi, ApiError } from "../client";
import { Task, TaskInput } from "@/types/task";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock data
const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  status: "pending",
  priority: "high",
  dueDate: "2024-12-31",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

const mockTaskInput: TaskInput = {
  title: "New Task",
  description: "New Description",
  status: "pending",
  priority: "medium",
  dueDate: "2024-06-15",
};

const API_BASE_URL = "http://localhost:3000/api";

describe("ApiError", () => {
  it("should create ApiError with correct properties", () => {
    const error = new ApiError("Test error", 404, "Not Found");
    
    expect(error.message).toBe("Test error");
    expect(error.status).toBe(404);
    expect(error.statusText).toBe("Not Found");
    expect(error.name).toBe("ApiError");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("tasksApi", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("getTasks", () => {
    it("should fetch all tasks without filters", async () => {
      const mockTasks = [mockTask];
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await tasksApi.getTasks();

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`);
      expect(result).toEqual(mockTasks);
    });

    it("should fetch tasks with filters", async () => {
      const mockTasks = [mockTask];
      const filters = { status: "pending" as const, priority: "high" as const };
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await tasksApi.getTasks(filters);

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks?status=pending&priority=high`);
      expect(result).toEqual(mockTasks);
    });

    it("should build correct URL with dueDate filter", async () => {
      const filters = { dueDate: "2024-12-31" };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      await tasksApi.getTasks(filters);

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks?dueDate=2024-12-31`);
    });

    it("should handle fetch error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => "Server error",
      });

      await expect(tasksApi.getTasks()).rejects.toThrow(ApiError);
      await expect(tasksApi.getTasks()).rejects.toThrow("Server error");
    });

    it("should handle error without response text", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: async () => "",
      });

      await expect(tasksApi.getTasks()).rejects.toThrow("Not Found");
    });
  });

  describe("getTask", () => {
    it("should fetch single task by id", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTask,
      });

      const result = await tasksApi.getTask("1");

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`);
      expect(result).toEqual(mockTask);
    });

    it("should handle task not found error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: async () => "Task not found",
      });

      await expect(tasksApi.getTask("999")).rejects.toThrow("Task not found");
    });
  });

  describe("createTask", () => {
    it("should create new task", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTask,
      });

      const result = await tasksApi.createTask(mockTaskInput);

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockTaskInput),
      });
      expect(result).toEqual(mockTask);
    });

    it("should handle validation error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => "Title is required",
      });

      await expect(tasksApi.createTask(mockTaskInput)).rejects.toThrow("Title is required");
    });
  });

  describe("updateTask", () => {
    it("should update existing task", async () => {
      const updatedTask = { ...mockTask, title: "Updated Task" };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => updatedTask,
      });

      const result = await tasksApi.updateTask("1", mockTaskInput);

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockTaskInput),
      });
      expect(result).toEqual(updatedTask);
    });

    it("should handle update not found error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: async () => "Task not found",
      });

      await expect(tasksApi.updateTask("999", mockTaskInput)).rejects.toThrow("Task not found");
    });
  });

  describe("deleteTask", () => {
    it("should delete task successfully", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
      });

      const result = await tasksApi.deleteTask("1");

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`, {
        method: "DELETE",
      });
      expect(result).toBeNull();
    });

    it("should handle delete not found error", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        text: async () => "Task not found",
      });

      await expect(tasksApi.deleteTask("999")).rejects.toThrow("Task not found");
    });
  });

  describe("handleResponse", () => {
    it("should handle 204 No Content response", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 204,
      });

      const result = await tasksApi.deleteTask("1");
      expect(result).toBeNull();
    });

    it("should handle JSON response", async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockTask,
      });

      const result = await tasksApi.getTask("1");
      expect(result).toEqual(mockTask);
    });

    it("should throw ApiError with correct properties", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => "Database connection failed",
      });

      try {
        await tasksApi.getTasks();
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(500);
        expect((error as ApiError).statusText).toBe("Internal Server Error");
        expect((error as ApiError).message).toBe("Database connection failed");
      }
    });
  });
});