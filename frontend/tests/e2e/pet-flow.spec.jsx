import { test, expect } from "@playwright/test";

test.describe("PetRealm E2E Flow", () => {
  test("should adopt, feed, and release a pet", async ({ page }) => {
    // Go to home page
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("PetRealm");

    // Go to adopt page
    await page.click("text=Adopt a Pet");
    await expect(page.locator("h1")).toContainText("Adopt a Pet");

    // Fill out adoption form
    await page.fill('input[placeholder="Enter pet name..."]', "TestPet");

    // Submit form and wait for API response
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/pets") &&
          response.request().method() === "POST"
      ),
      page.click('button[type="submit"]'),
    ]);

    // Should redirect to home page
    await expect(page.locator("h1")).toContainText("PetRealm");

    // Look for the new pet
    await expect(page.locator("text=TestPet")).toBeVisible();

    // Click on the pet to view details
    await page.click("text=TestPet");
    await expect(page.locator("h1")).toContainText("TestPet");

    // Feed the pet
    await page.click("text=Feed");

    // Release the pet
    page.on("dialog", (dialog) => dialog.accept());
    await page.click("text=Release");

    // Should redirect to home page
    await expect(page.locator("h1")).toContainText("PetRealm");
  });

  test("should validate empty pet name", async ({ page }) => {
    await page.goto("/adopt");

    // Set up dialog handler before clicking
    page.on("dialog", (dialog) => {
      expect(dialog.message()).toContain("Please enter a name");
      dialog.accept();
    });

    // Try to submit empty form
    await page.click('button[type="submit"]');
  });
});
