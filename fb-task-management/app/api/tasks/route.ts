import { NextRequest, NextResponse } from 'next/server';
import { Task, TaskInput } from '@/types/task';
import { getMockTasks, addMockTask } from '@/lib/mock-data';

// Helper function to generate new ID
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// GET /api/tasks - Get all tasks with optional filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const priority = searchParams.get('priority');
  const dueDate = searchParams.get('dueDate');

  let filteredTasks = [...getMockTasks()];

  // Apply filters
  if (status) {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }
  
  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }
  
  if (dueDate) {
    filteredTasks = filteredTasks.filter(task => task.dueDate === dueDate);
  }

  // Simulate network delay in development
  if (process.env.NODE_ENV === 'development') {
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return NextResponse.json(filteredTasks);
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const taskInput: TaskInput = await request.json();

    // Validate required fields
    if (!taskInput.title || !taskInput.status) {
      return NextResponse.json(
        { error: 'Title and status are required' },
        { status: 400 }
      );
    }

    // Create new task
    const newTask: Task = {
      id: generateId(),
      title: taskInput.title,
      description: taskInput.description || '',
      dueDate: taskInput.dueDate || '',
      priority: taskInput.priority || 'medium',
      status: taskInput.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addMockTask(newTask);

    // Simulate network delay in development
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}