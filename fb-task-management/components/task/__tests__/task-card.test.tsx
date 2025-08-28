import { render, screen } from "@testing-library/react";
import { TaskCard } from "../task-card";

const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  status: "pending" as const,
  priority: "high" as const,
  dueDate: "2024-12-31",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

describe("TaskCard", () => {
  it("renders task information", () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("renders without description", () => {
    const taskWithoutDescription = { ...mockTask, description: "" };
    render(<TaskCard task={taskWithoutDescription} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("shows different priorities", () => {
    const { rerender } = render(<TaskCard task={{ ...mockTask, priority: "low" }} />);
    expect(screen.getByText("Low")).toBeInTheDocument();

    rerender(<TaskCard task={{ ...mockTask, priority: "medium" }} />);
    expect(screen.getByText("Medium")).toBeInTheDocument();

    rerender(<TaskCard task={{ ...mockTask, priority: "high" }} />);
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("shows different statuses", () => {
    const { rerender } = render(<TaskCard task={{ ...mockTask, status: "pending" }} />);
    expect(screen.getAllByText("Pending").length).toBeGreaterThan(0);

    rerender(<TaskCard task={{ ...mockTask, status: "in progress" }} />);
    expect(screen.getAllByText("In Progress").length).toBeGreaterThan(0);

    rerender(<TaskCard task={{ ...mockTask, status: "completed" }} />);
    expect(screen.getAllByText("Completed").length).toBeGreaterThan(0);
  });

  it("applies completed styling", () => {
    const completedTask = { ...mockTask, status: "completed" as const };
    render(<TaskCard task={completedTask} />);

    const title = screen.getByText("Test Task");
    expect(title).toHaveClass("line-through");
  });
});