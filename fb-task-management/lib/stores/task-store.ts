import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task, TaskInput, TaskFilters, TaskSortOptions } from "@/types/task";
import { tasksApi } from "@/lib/api/client";

interface TaskStore {
  // State
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: TaskFilters;
  sortOptions: TaskSortOptions;

  // Actions
  fetchTasks: () => Promise<void>;
  createTask: (taskInput: TaskInput) => Promise<void>;
  updateTask: (id: string, taskInput: TaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
  setSortOptions: (sortOptions: TaskSortOptions) => void;
  clearError: () => void;

  // Computed/derived state helpers
  getFilteredAndSortedTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  getTaskStats: () => {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      // Initial state
      tasks: [],
      isLoading: false,
      error: null,
      filters: {},
      sortOptions: {
        field: "createdAt",
        direction: "desc",
      },

      // Actions
      fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const tasks = await tasksApi.getTasks(get().filters);
          set({ tasks, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to fetch tasks",
            isLoading: false,
          });
        }
      },

      createTask: async (taskInput: TaskInput) => {
        set({ isLoading: true, error: null });
        try {
          const newTask = await tasksApi.createTask(taskInput);
          set((state) => ({
            tasks: [newTask, ...state.tasks],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to create task",
            isLoading: false,
          });
          throw error; // Re-throw for form handling
        }
      },

      updateTask: async (id: string, taskInput: TaskInput) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTask = await tasksApi.updateTask(id, taskInput);
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? updatedTask : task
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to update task",
            isLoading: false,
          });
          throw error; // Re-throw for form handling
        }
      },

      deleteTask: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await tasksApi.deleteTask(id);
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to delete task",
            isLoading: false,
          });
          throw error; // Re-throw for UI handling
        }
      },

      setFilters: (filters: TaskFilters) => {
        set({ filters });
        // Optionally refetch with new filters
        get().fetchTasks();
      },

      setSortOptions: (sortOptions: TaskSortOptions) => {
        set({ sortOptions });
      },

      clearError: () => {
        set({ error: null });
      },

      // Computed/derived state helpers
      getFilteredAndSortedTasks: () => {
        const { tasks, filters, sortOptions } = get();

        // Apply filters
        const filteredTasks = tasks.filter((task) => {
          if (filters.status && task.status !== filters.status) return false;
          if (filters.priority && task.priority !== filters.priority)
            return false;
          if (filters.dueDate && task.dueDate !== filters.dueDate) return false;
          return true;
        });

        // Apply sorting
        filteredTasks.sort((a, b) => {
          const { field, direction } = sortOptions;
          let aValue: string | number = a[field];
          let bValue: string | number = b[field];

          // Handle date sorting
          if (
            field === "dueDate" ||
            field === "createdAt" ||
            field === "updatedAt"
          ) {
            aValue = new Date(aValue as string).getTime();
            bValue = new Date(bValue as string).getTime();
          }

          // Handle priority sorting (low < medium < high)
          if (field === "priority") {
            const priorityOrder = { low: 1, medium: 2, high: 3 };
            aValue = priorityOrder[aValue as keyof typeof priorityOrder];
            bValue = priorityOrder[bValue as keyof typeof priorityOrder];
          }

          if (aValue < bValue) return direction === "asc" ? -1 : 1;
          if (aValue > bValue) return direction === "asc" ? 1 : -1;
          return 0;
        });

        return filteredTasks;
      },

      getTaskById: (id: string) => {
        return get().tasks.find((task) => task.id === id);
      },

      getTaskStats: () => {
        const tasks = get().tasks;
        return {
          total: tasks.length,
          pending: tasks.filter((t) => t.status === "pending").length,
          inProgress: tasks.filter((t) => t.status === "in progress").length,
          completed: tasks.filter((t) => t.status === "completed").length,
        };
      },
    }),
    {
      name: "task-store",
      storage: createJSONStorage(() => sessionStorage),
      // Only persist tasks and filters, not loading states
      partialize: (state) => ({
        tasks: state.tasks,
        filters: state.filters,
        sortOptions: state.sortOptions,
      }),
    }
  )
);
