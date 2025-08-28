"use client";

import { useState } from "react";
import { Task, TaskInput, TaskStatus } from "@/types/task";
import { TaskCard } from "./task-card";
import { TaskForm } from "../forms/task-form";
import {
  Button,
  Card,
  CardContent,
  Input,
} from "fb-ui-library";

import { Plus, FileText, Search } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onCreateTask: (data: TaskInput) => Promise<void>;
  onUpdateTask: (id: string, data: TaskInput) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onStatusChange: (task: Task, newStatus: TaskStatus) => Promise<void>;
}

export function TaskList({
  tasks,
  isLoading,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onStatusChange,
}: TaskListProps) {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = async (task: Task) => {
    try {
      console.log("Deleting task:", task.id);
      await onDeleteTask(task.id);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCreateSubmit = async (data: TaskInput) => {
    await onCreateTask(data);
  };

  const handleEditSubmit = async (data: TaskInput) => {
    if (editingTask) {
      await onUpdateTask(editingTask.id, data);
      setEditingTask(null);
    }
  };

  const handleStatusChange = async (task: Task, newStatus: TaskStatus) => {
    await onStatusChange(task, newStatus);
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button and Search */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-8 bg-gray-50"
            data-testid="task-search"
          />
        </div>
        <Button onClick={() => setIsCreateFormOpen(true)} className="shrink-0" variant="default" size="default" data-testid="create-task-button">
          <Plus className="h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? "No tasks found" : "No tasks yet"}
            </h3>
            <p className="text-gray-600 mb-4 max-w-sm">
              {searchQuery
                ? `No tasks match "${searchQuery}". Try adjusting your search or filters.`
                : "Get started by creating your first task to track your work and stay organized."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateFormOpen(true)} size="default" data-testid="create-first-task-button">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Task
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4" data-testid="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Loading Indicator for Additional Data */}
      {isLoading && tasks.length > 0 && (
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Task Form */}
      <TaskForm
        open={isCreateFormOpen}
        onOpenChange={setIsCreateFormOpen}
        onSubmit={handleCreateSubmit}
        isLoading={isLoading}
      />

      {/* Edit Task Form */}
      <TaskForm
        task={editingTask || undefined}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onSubmit={handleEditSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
