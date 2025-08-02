// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: [
    {
      command: "cd .. && npm run dev",
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "cp .env.test .env.local && npm run dev",
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
