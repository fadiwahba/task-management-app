import { test, expect } from "@playwright/test";

test.describe("Create Task", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // must navigate before evaluate
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload(); // ensures the app restarts with empty storage
  });

  test("should create a new task successfully", async ({ page }) => {
    // Create unique identifiers to avoid conflicts between parallel test runs
    const timestamp = Date.now();
    const uniqueTitle = `test task ${timestamp}`;
    const uniqueDescription = `test task description ${timestamp}`;

    await page.goto("http://localhost:3000/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await expect(page.getByRole("heading")).toContainText("Task Management");
    await expect(page.getByTestId("create-task-button")).toBeVisible();
    await page.getByTestId("create-task-button").click();
    // wait for the dialog to appear
    await expect(page.getByTestId("task-form-dialog")).toBeVisible();
    // Check for form fields and fill them out
    await expect(
      page.getByRole("heading", { name: "Create New Task" })
    ).toBeVisible();
    await expect(page.getByText("Title *")).toBeVisible();
    await expect(page.getByTestId("task-title-input")).toBeVisible();
    await page.getByTestId("task-title-input").click();
    await page.getByTestId("task-title-input").fill(uniqueTitle);
    await expect(page.getByText("Description", { exact: true })).toBeVisible();
    await expect(page.getByTestId("task-description-input")).toBeVisible();
    await page.getByTestId("task-description-input").click();
    await page.getByTestId("task-description-input").fill(uniqueDescription);
    await expect(
      page.getByLabel("Create New Task").getByText("Due Date")
    ).toBeVisible();
    await expect(page.getByTestId("task-due-date-input")).toBeVisible();
    await page.getByTestId("task-due-date-input").fill("2025-08-30");
    await expect(
      page.getByLabel("Create New Task").getByText("Priority")
    ).toBeVisible();
    await expect(page.getByTestId("task-priority-select")).toBeVisible();
    await page.getByTestId("task-priority-select").click();
    await expect(page.getByRole("option", { name: "Low" })).toBeVisible();
    await page.getByRole("option", { name: "Low" }).click();
    await expect(page.getByText("Status *")).toBeVisible();
    await expect(page.getByTestId("task-status-select")).toBeVisible();
    await page.getByTestId("task-status-select").click();
    await expect(page.getByRole("option", { name: "Pending" })).toBeVisible();
    await page.getByRole("option", { name: "Pending" }).click();
    await expect(page.getByTestId("task-form-cancel-button")).toBeVisible();
    await expect(page.getByTestId("task-form-submit-button")).toBeVisible();
    await page.getByTestId("task-form-submit-button").click();
    // Wait for the dialog to close
    await expect(page.getByTestId("task-form-dialog")).not.toBeVisible();
    
    // Verify the new task appears in the task list using unique identifiers
    const newTask = page
      .locator('[data-testid="task-card"]')
      .filter({
        has: page.getByText(uniqueTitle, { exact: true }),
        hasText: uniqueDescription,
      })
      .first();
    await expect(newTask).toBeVisible();
    await expect(newTask).toContainText(uniqueDescription);
    await expect(newTask).toContainText("Low");
    await expect(newTask).toContainText("Pending");
    await expect(newTask).toContainText("Aug 30, 2025");
    await expect(newTask).toContainText("Updated Aug 28");
  });
});
