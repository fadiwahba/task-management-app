import { test, expect } from "@playwright/test";

test.describe("Update Task", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // must navigate before evaluate
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload(); // ensures the app restarts with empty storage
  });

  test("should update a task successfully", async ({ page }) => {
    // Create unique identifiers to avoid conflicts between parallel test runs
    const timestamp = Date.now();
    const uniqueTitle = `test editing a task ${timestamp}`;
    const uniqueDescription = `a task description ${timestamp}`;
    const uniqueEditedTitle = `test editing a task - edited ${timestamp}`;

    await page.goto("http://localhost:3000/");
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload(); // ensures the app restarts with empty storage
    await expect(
      page.getByRole("heading", { name: "Task Management" })
    ).toBeVisible();
    await expect(page.locator(".bg-card").first()).toBeVisible();
    await expect(page.getByTestId("create-task-button")).toBeVisible();
    await page.getByTestId("create-task-button").click();
    // wait for the dialog to appear
    await expect(page.getByTestId("task-form-dialog")).toBeVisible();
    // Check for form fields and fill them out
    await expect(page.getByTestId("task-title-input")).toBeVisible();
    await page.getByTestId("task-title-input").click();
    await page.getByTestId("task-title-input").fill(uniqueTitle);
    await expect(page.getByTestId("task-description-input")).toBeVisible();
    await page.getByTestId("task-description-input").click();
    await page.getByTestId("task-description-input").fill(uniqueDescription);
    await expect(page.getByTestId("task-due-date-input")).toBeVisible();
    await page.getByTestId("task-due-date-input").fill("2025-08-30");
    await expect(page.getByTestId("task-form-submit-button")).toBeVisible();
    await page.getByTestId("task-form-submit-button").click();

    // Wait for dialog to close
    await expect(page.getByTestId("task-form-dialog")).not.toBeVisible();

    // Find the specific task card with exact title match and description
    const taskCard = page
      .locator('[data-testid="task-card"]')
      .filter({
        has: page.getByText(uniqueTitle, { exact: true }),
        hasText: uniqueDescription,
      })
      .first();
    await expect(taskCard).toBeVisible();

    const taskMenuTrigger = taskCard.getByTestId("task-menu-trigger");
    await expect(taskMenuTrigger).toBeVisible();
    await taskMenuTrigger.click();

    await expect(page.getByTestId("task-menu-edit")).toBeVisible();
    await page.getByTestId("task-menu-edit").click();
    await expect(page.getByTestId("task-form-dialog")).toBeVisible();
    await expect(page.getByTestId("task-title-input")).toBeVisible();
    await page.getByTestId("task-title-input").click();
    await page
      .getByTestId("task-title-input")
      .fill(uniqueEditedTitle);
    await expect(page.getByTestId("task-form-submit-button")).toBeVisible();
    await page.getByTestId("task-form-submit-button").click();

    // Wait for dialog to close
    await expect(page.getByTestId("task-form-dialog")).not.toBeVisible();

    // Verify the specific task with our unique description now has the updated title
    const updatedTaskCard = page
      .locator('[data-testid="task-card"]')
      .filter({
        has: page.getByText(uniqueEditedTitle, { exact: true }),
        hasText: uniqueDescription,
      })
      .first();
    await expect(updatedTaskCard).toBeVisible();
  });
});
