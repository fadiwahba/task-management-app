import { Task } from '@/types/task';

// Shared mock data store for development
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Q4 Investment Portfolio',
    description: 'Analyze performance metrics and rebalance portfolio allocations',
    dueDate: '2025-08-25',
    priority: 'high',
    status: 'pending',
    createdAt: '2025-08-21T10:00:00Z',
    updatedAt: '2025-08-21T10:00:00Z',
  },
  {
    id: '2',
    title: 'Client Meeting Preparation',
    description: 'Prepare presentation materials for institutional client meeting',
    dueDate: '2025-08-23',
    priority: 'medium',
    status: 'in progress',
    createdAt: '2025-08-21T09:00:00Z',
    updatedAt: '2025-08-21T11:30:00Z',
  },
  {
    id: '3',
    title: 'Risk Assessment Report',
    description: 'Complete monthly risk assessment for equity positions',
    dueDate: '2025-08-22',
    priority: 'high',
    status: 'completed',
    createdAt: '2025-08-20T14:00:00Z',
    updatedAt: '2025-08-21T16:45:00Z',
  },
  {
    id: '4',
    title: 'Market Research Update',
    description: 'Research emerging market trends and opportunities',
    dueDate: '2025-08-30',
    priority: 'low',
    status: 'pending',
    createdAt: '2025-08-21T08:00:00Z',
    updatedAt: '2025-08-21T08:00:00Z',
  }
];

// Helper functions to manipulate mock data
export const getMockTasks = () => mockTasks;

export const addMockTask = (task: Task) => {
  mockTasks.push(task);
  return task;
};

export const updateMockTask = (id: string, updates: Partial<Task>) => {
  const index = mockTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTasks[index] = { ...mockTasks[index], ...updates, updatedAt: new Date().toISOString() };
    return mockTasks[index];
  }
  return null;
};

export const deleteMockTask = (id: string) => {
  const index = mockTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    const deleted = mockTasks[index];
    mockTasks.splice(index, 1);
    return deleted;
  }
  return null;
};

export const findMockTask = (id: string) => {
  return mockTasks.find(t => t.id === id) || null;
};