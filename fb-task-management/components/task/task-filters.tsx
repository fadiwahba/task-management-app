"use client";

import { TaskFilters, TaskSortOptions } from "@/types/task";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "fb-ui-library";
import { X, Filter, ArrowUpDown } from "lucide-react";

interface TaskFiltersProps {
  filters: TaskFilters;
  sortOptions: TaskSortOptions;
  onFiltersChange: (filters: TaskFilters) => void;
  onSortChange: (sortOptions: TaskSortOptions) => void;
  taskCounts: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export function TaskFiltersComponent({
  filters,
  sortOptions,
  onFiltersChange,
  onSortChange,
  taskCounts,
}: TaskFiltersProps) {
  const updateFilter = (key: keyof TaskFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== "all"
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters & Sorting
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
              data-testid="clear-all-filters"
            >
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Task Statistics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 rounded-md bg-gray-50 dark:bg-gray-800">
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {taskCounts.total}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-md">
            <div className="text-3xl font-semibold text-yellow-800">
              {taskCounts.pending}
            </div>
            <div className="text-xs text-yellow-600">Pending</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-md">
            <div className="text-3xl font-semibold text-blue-800">
              {taskCounts.inProgress}
            </div>
            <div className="text-xs text-blue-600">In Progress</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-md">
            <div className="text-3xl font-semibold text-green-800">
              {taskCounts.completed}
            </div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                updateFilter("status", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="status-filter" className="w-full" data-testid="status-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority-filter">Priority</Label>
            <Select
              value={filters.priority || "all"}
              onValueChange={(value) =>
                updateFilter("priority", value === "all" ? undefined : value)
              }
            >
              <SelectTrigger id="priority-filter" className="w-full" data-testid="priority-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date-filter">Due Date</Label>
            <Input
              id="due-date-filter"
              type="date"
              value={filters.dueDate || ""}
              onChange={(e) => updateFilter("dueDate", e.target.value)}
              className="w-fit"
              data-testid="due-date-filter"
            />
          </div>
        </div>

        {/* Sorting */}
        <div className="grid grid-cols-2 gap-4 pt-4 mt-2 border-t">
          <div className="space-y-2">
            <Label htmlFor="sort-field" className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4" />
              Sort by
            </Label>
            <Select
              value={sortOptions.field}
              onValueChange={(value) =>
                onSortChange({
                  ...sortOptions,
                  field: value as TaskSortOptions["field"],
                })
              }
            >
              <SelectTrigger id="sort-field" className="w-full" data-testid="sort-field">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="createdAt">Created Date</SelectItem>
                <SelectItem value="updatedAt">Updated Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort-direction">Direction</Label>
            <Select
              value={sortOptions.direction}
              onValueChange={(value) =>
                onSortChange({
                  ...sortOptions,
                  direction: value as "asc" | "desc",
                })
              }
            >
              <SelectTrigger id="sort-direction" className="w-full" data-testid="sort-direction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {filters.status && (
              <Badge variant="secondary" className="text-xs">
                Status: {filters.status}
                <button
                  onClick={() => updateFilter("status", undefined)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.priority && (
              <Badge variant="secondary" className="text-xs">
                Priority: {filters.priority}
                <button
                  onClick={() => updateFilter("priority", undefined)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dueDate && (
              <Badge variant="secondary" className="text-xs">
                Due: {filters.dueDate}
                <button
                  onClick={() => updateFilter("dueDate", undefined)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
