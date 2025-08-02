import { test, expect } from "@playwright/test";

test.describe("PetRealm E2E Flow", () => {
  test("should adopt, feed, and release a pet", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("PetRealm");

    await page.click("text=Adopt a Pet");
    await expect(page.locator("h1")).toContainText("Adopt a Pet");

    await page.fill('input[placeholder="Enter pet name..."]', "TestPet");

    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/pets") &&
          response.request().method() === "POST"
      ),
      page.click('button[type="submit"]'),
    ]);

    await expect(page.locator("h1")).toContainText("PetRealm");

    await expect(page.locator("text=TestPet")).toBeVisible();

    await page.click("text=TestPet");
    await expect(page.locator("h1")).toContainText("TestPet");

    await page.click("text=Feed");

    page.on("dialog", (dialog) => dialog.accept());
    await page.click("text=Release");

    await expect(page.locator("h1")).toContainText("PetRealm");
  });

  test("should validate empty pet name", async ({ page }) => {
    await page.goto("/adopt");

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toContain("Please enter a name");
      dialog.accept();
    });

    await page.click('button[type="submit"]');
  });
});
