import { render, screen } from "@testing-library/react";
import { TaskForm } from "../task-form";

describe("TaskForm", () => {
  const mockTask = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    dueDate: "2024-12-31",
    priority: "high" as const,
    status: "pending" as const,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  const onSubmit = jest.fn();
  const onOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create mode correctly", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );
    
    expect(screen.getByText("Create New Task")).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("renders edit mode correctly", () => {
    render(
      <TaskForm
        task={mockTask}
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );
    
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  it("shows loader when loading", () => {
    render(
      <TaskForm
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        isLoading
      />
    );
    
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );

    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter task description (optional)")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <TaskForm open={false} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );
    
    expect(screen.queryByText("Create New Task")).not.toBeInTheDocument();
  });
});