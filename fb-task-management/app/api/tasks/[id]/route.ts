import { NextRequest, NextResponse } from "next/server";
import { TaskInput } from "@/types/task";
import { findMockTask, updateMockTask, deleteMockTask } from "@/lib/mock-data";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/tasks/[id] - Get a single task by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const task = findMockTask(id);

  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  // Simulate network delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return NextResponse.json(task);
}

// PUT /api/tasks/[id] - Update an existing task
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const taskInput: TaskInput = await request.json();

    // Validate required fields
    if (!taskInput.title || !taskInput.status) {
      return NextResponse.json(
        { error: "Title and status are required" },
        { status: 400 }
      );
    }

    // Update task using shared data
    const updatedTask = updateMockTask(id, {
      title: taskInput.title,
      description: taskInput.description || "",
      dueDate: taskInput.dueDate || "",
      priority: taskInput.priority || "medium",
      status: taskInput.status,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Simulate network delay in development
    if (process.env.NODE_ENV === "development") {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    return NextResponse.json(updatedTask);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deletedTask = deleteMockTask(id);

  if (!deletedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  // Simulate network delay in development
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return new NextResponse(null, { status: 204 });
}
