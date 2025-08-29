"use client";

import { useEffect, useState } from "react";
import { TaskList } from "@/components/task/task-list";
import { TaskFiltersComponent } from "@/components/task/task-filters";
import { useTaskStore } from "@/lib/stores/task-store";
import { Task, TaskInput, TaskStatus } from "@/types/task";
import { Card, CardContent, ThemeToggle } from "fb-ui-library";
import { useTheme } from "next-themes";

export default function TasksWrapper() {
  const { theme, setTheme } = useTheme();
  const {
    isLoading,
    error,
    filters,
    sortOptions,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    setFilters,
    setSortOptions,
    clearError,
    getFilteredAndSortedTasks,
    getTaskStats,
  } = useTaskStore();

  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch tasks on mount
  useEffect(() => {
    if (mounted) {
      fetchTasks();
    }
  }, [mounted, fetchTasks]);

  // Handle task creation
  const handleCreateTask = async (data: TaskInput) => {
    await createTask(data);
  };

  // Handle task updates
  const handleUpdateTask = async (id: string, data: TaskInput) => {
    await updateTask(id, data);
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  // Handle status changes (optimistic updates)
  const handleStatusChange = async (task: Task, newStatus: TaskStatus) => {
    await updateTask(task.id, { ...task, status: newStatus });
  };

  // Get filtered and sorted tasks
  const displayTasks = getFilteredAndSortedTasks();
  const taskStats = getTaskStats();

  // Handle hydration loading state
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  return (
    <div className={
      theme === "light" 
        ? "bg-gradient-to-br from-indigo-50 to-amber-50 min-h-screen w-full"
        : "bg-gradient-to-br from-slate-800 to-slate-950 min-h-screen w-full"
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Task Management
            </h1>
            <p className="text-muted-foreground">
              Organize and track your work efficiently
            </p>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} data-testid="theme-toggle" />
        </header>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-red-800">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-600"
                data-testid="dismiss-error"
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div>
          <Card className="shadow-xl mb-12 p-8">
            <CardContent className="grid grid-cols-1 lg:grid-cols-6 gap-8 p-0">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-2" data-testid="task-filters-sidebar">
                <TaskFiltersComponent
                  filters={filters}
                  sortOptions={sortOptions}
                  onFiltersChange={setFilters}
                  onSortChange={setSortOptions}
                  taskCounts={taskStats}
                />
              </aside>

              {/* Task List */}
              <section className="lg:col-span-4" data-testid="task-list-section">
                <TaskList
                  tasks={displayTasks}
                  isLoading={isLoading}
                  onCreateTask={handleCreateTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
