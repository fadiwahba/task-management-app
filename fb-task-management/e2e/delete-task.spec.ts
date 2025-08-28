import { test, expect } from "@playwright/test";

test.describe("Delete Task", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000"); // must navigate before evaluate
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload(); // ensures the app restarts with empty storage
  });

  test("should delete a task successfully", async ({ page }) => {
    // Create unique identifiers to avoid conflicts between parallel test runs
    const timestamp = Date.now();
    const uniqueTitle = `test deleting a task ${timestamp}`;
    const uniqueDescription = `task to be deleted ${timestamp}`;

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

    // Count task cards with our unique description before deletion
    const tasksBeforeDeletion = page
      .locator('[data-testid="task-card"]')
      .filter({
        hasText: uniqueDescription,
      });
    const countBefore = await tasksBeforeDeletion.count();

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

    await expect(page.getByTestId("task-menu-delete")).toBeVisible();
    await page.getByTestId("task-menu-delete").click();

    // Wait for delete confirmation dialog to appear
    await expect(page.getByTestId("delete-task-dialog")).toBeVisible();
    await expect(page.getByText("Delete Task")).toBeVisible();

    // Confirm deletion
    await expect(page.getByTestId("delete-confirm-button")).toBeVisible();
    await page.getByTestId("delete-confirm-button").click();

    // Wait for confirmation dialog to close
    await expect(page.getByTestId("delete-task-dialog")).not.toBeVisible();

    // Wait for the specific task to be removed from the DOM (handles async API call)
    await expect(taskCard).not.toBeVisible();

    // Optional: Also verify the count decreased (now that deletion completed)
    const tasksAfterDeletion = page
      .locator('[data-testid="task-card"]')
      .filter({
        hasText: uniqueDescription,
      });
    const countAfter = await tasksAfterDeletion.count();
    expect(countAfter).toBe(countBefore - 1);
  });
});
