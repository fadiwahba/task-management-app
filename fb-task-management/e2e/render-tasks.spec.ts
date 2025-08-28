import { test, expect } from "@playwright/test";

test.describe("Render Tasks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // must navigate before evaluate
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload(); // ensures the app restarts with empty storage
  });

  test("should render all tasks successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload(); // ensures the app restarts with empty storage

    // Verify the main page structure loads correctly
    await expect(
      page.getByRole("heading", { name: "Task Management" })
    ).toBeVisible();
    await expect(
      page.getByText("Organize and track your work efficiently")
    ).toBeVisible();

    // Verify header contains the main title and subtitle
    await expect(page.locator("header")).toBeVisible();

    // Verify filters sidebar is present
    await expect(page.getByTestId("task-filters-sidebar")).toBeVisible();
    await expect(page.getByText("Filters & Sorting")).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
    await expect(page.getByText("Pending")).toBeVisible();
    await expect(page.getByText("In Progress")).toBeVisible();
    await expect(page.getByText("Completed")).toBeVisible();

    // Verify task list section is present
    await expect(page.getByTestId("task-list-section")).toBeVisible();
    await expect(page.getByTestId("task-list")).toBeVisible();

    // Verify create task button is present
    await expect(page.getByTestId("create-task-button")).toBeVisible();

    // Verify search functionality is present
    await expect(page.getByTestId("task-search")).toBeVisible();
    await expect(page.getByTestId("task-search")).toHaveAttribute("placeholder", "Search tasks...");

    // Verify filter controls are present
    await expect(page.getByTestId("status-filter")).toBeVisible();
    await expect(page.getByTestId("priority-filter")).toBeVisible();
    await expect(page.getByTestId("due-date-filter")).toBeVisible();
    await expect(page.getByTestId("sort-field")).toBeVisible();
    await expect(page.getByTestId("sort-direction")).toBeVisible();

    // Check if there are sample tasks (there might be default tasks loaded)
    const taskCards = page.locator('[data-testid="task-card"]');
    const taskCount = await taskCards.count();
    
    if (taskCount > 0) {
      // If tasks exist, verify they render properly
      const firstTask = taskCards.first();
      await expect(firstTask).toBeVisible();
      
      // Verify task card structure - check for task menu trigger
      await expect(firstTask.getByTestId("task-menu-trigger")).toBeVisible();
      
      // Verify task shows priority and status badges (these should be visible)
      const badges = firstTask.locator('.bg-yellow-100, .bg-green-100, .bg-red-100, .bg-gray-100, .bg-blue-100');
      await expect(badges.first()).toBeVisible();
    } else {
      // If no tasks exist, verify empty state or create first task button
      const createButtons = page.getByTestId("create-first-task-button");
      const createButtonCount = await createButtons.count();
      
      if (createButtonCount > 0) {
        await expect(createButtons.first()).toBeVisible();
        await expect(page.getByText("No tasks yet")).toBeVisible();
      }
    }

    // Test that the UI is responsive by checking that key elements are properly displayed
    // Verify the layout container
    await expect(page.locator(".max-w-7xl")).toBeVisible();
    
    // Verify grid layout for filters and task list
    await expect(page.locator(".lg\\:col-span-2")).toBeVisible(); // Filters sidebar
    await expect(page.locator(".lg\\:col-span-4")).toBeVisible(); // Task list section

    // Verify page is fully loaded by checking multiple elements are visible
    await expect(page.locator("main")).toBeVisible();
  });

  test("should handle task rendering after creating multiple tasks", async ({ page }) => {
    const timestamp = Date.now();
    
    await page.goto("http://localhost:3000/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();

    // Create 3 different tasks to test rendering
    const tasks = [
      {
        title: `High Priority Task ${timestamp}`,
        description: `Urgent task description ${timestamp}`,
        priority: "High",
        status: "Pending"
      },
      {
        title: `Medium Priority Task ${timestamp}`,
        description: `Regular task description ${timestamp}`,
        priority: "Medium", 
        status: "In Progress"
      },
      {
        title: `Low Priority Task ${timestamp}`,
        description: `Low importance task ${timestamp}`,
        priority: "Low",
        status: "Completed"
      }
    ];

    // Create each task
    for (const task of tasks) {
      await page.getByTestId("create-task-button").click();
      await expect(page.getByTestId("task-form-dialog")).toBeVisible();
      
      await page.getByTestId("task-title-input").fill(task.title);
      await page.getByTestId("task-description-input").fill(task.description);
      await page.getByTestId("task-due-date-input").fill("2025-08-30");
      
      // Set priority
      await page.getByTestId("task-priority-select").click();
      await page.getByRole("option", { name: task.priority }).click();
      
      // Set status  
      await page.getByTestId("task-status-select").click();
      await page.getByRole("option", { name: task.status }).click();
      
      await page.getByTestId("task-form-submit-button").click();
      await expect(page.getByTestId("task-form-dialog")).not.toBeVisible();
    }

    // Verify all tasks are rendered correctly
    const taskCards = page.locator('[data-testid="task-card"]');
    const taskCount = await taskCards.count();
    expect(taskCount).toBeGreaterThanOrEqual(3);

    // Verify each created task is visible with correct content
    for (const task of tasks) {
      const taskCard = page
        .locator('[data-testid="task-card"]')
        .filter({
          has: page.getByText(task.title, { exact: true }),
          hasText: task.description,
        })
        .first();
      
      await expect(taskCard).toBeVisible();
      await expect(taskCard).toContainText(task.title);
      await expect(taskCard).toContainText(task.description);
      await expect(taskCard).toContainText(task.priority);
      await expect(taskCard).toContainText(task.status);
      
      // Verify task menu is accessible
      await expect(taskCard.getByTestId("task-menu-trigger")).toBeVisible();
    }

    // Verify task statistics are updated correctly  
    await expect(page.getByText("Total")).toBeVisible();
    
    // Check that different priority/status tasks have different styling
    const highPriorityTask = page
      .locator('[data-testid="task-card"]')
      .filter({ hasText: tasks[0].title })
      .first();
    const completedTask = page
      .locator('[data-testid="task-card"]')
      .filter({ hasText: tasks[2].title })
      .first();
    
    // Verify high priority task has red styling
    await expect(highPriorityTask.locator('.bg-red-100')).toBeVisible();
    
    // Verify completed task has different opacity (completed styling)
    await expect(completedTask).toHaveClass(/opacity-75/);
  });
});