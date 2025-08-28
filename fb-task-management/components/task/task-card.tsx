"use client";

import { Task, TaskPriority, TaskStatus } from "@/types/task";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "fb-ui-library";

import { Calendar, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (task: Task, newStatus: TaskStatus) => void;
  className?: string;
}

const priorityConfig: Record<TaskPriority, { color: string; label: string }> = {
  low: { color: "bg-green-100 text-green-800 border-green-200", label: "Low" },
  medium: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Medium",
  },
  high: { color: "bg-red-100 text-red-800 border-red-200", label: "High" },
};

const statusConfig: Record<TaskStatus, { color: string; label: string }> = {
  pending: {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    label: "Pending",
  },
  "in progress": {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    label: "In Progress",
  },
  completed: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Completed",
  },
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  className,
}: TaskCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const formatDueDate = (dateString: string) => {
    if (!dateString) return null;

    const date = new Date(dateString);

    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";

    return format(date, "MMM d, yyyy");
  };

  const getDueDateColor = (dateString: string) => {
    if (!dateString) return "text-gray-500";

    const date = new Date(dateString);

    if (isPast(date) && !isToday(date) && task.status !== "completed") {
      return "text-red-600";
    }
    if (isToday(date)) return "text-orange-600";
    if (isTomorrow(date)) return "text-yellow-600";

    return "text-gray-600";
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    onStatusChange?.(task, newStatus);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(task);
    setShowDeleteDialog(false);
  };

  return (
    <Card
      className={cn(
        "transition-shadow hover:shadow-lg",
        className,
        task.status === "completed" &&
          "opacity-75 bg-green-50 dark:bg-green-900"
      )}
      data-testid="task-card"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={cn(
              "text-lg leading-tight",
              task.status === "completed" && "line-through text-gray-500"
            )}
          >
            {task.title}
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid="task-menu-trigger">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid="task-menu-content">
              <DropdownMenuItem onClick={() => onEdit?.(task)} data-testid="task-menu-edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setShowDeleteDialog(true);
                    }}
                    className="text-red-600 focus:text-red-600"
                    data-testid="task-menu-delete"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent data-testid="delete-task-dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &ldquo;{task.title}
                      &rdquo;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="delete-cancel-button">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteConfirm}
                      className="bg-red-600 hover:bg-red-700"
                      data-testid="delete-confirm-button"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={priorityConfig[task.priority].color}
          >
            {priorityConfig[task.priority].label}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="outline"
                className={cn(
                  statusConfig[task.status].color,
                  "cursor-pointer hover:bg-opacity-80"
                )}
              >
                {statusConfig[task.status].label}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusChange("in progress")}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {task.description && (
          <p
            className={cn(
              "text-sm text-forground mb-3 line-clamp-2",
              task.status === "completed" && "text-gray-400"
            )}
          >
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm">
          {task.dueDate && (
            <div
              className={cn(
                "flex items-center gap-1",
                getDueDateColor(task.dueDate)
              )}
            >
              <Calendar className="h-4 w-4" />
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Updated {format(new Date(task.updatedAt), "MMM d")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
