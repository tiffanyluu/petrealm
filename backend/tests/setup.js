import { beforeAll, afterAll, afterEach } from "vitest";
import pool from "../src/config/index.js";

const mockCloudWatch = {
  putMetricData: () => ({ promise: () => Promise.resolve() }),
};

const mockLogger = {
  info: () => {},
  error: () => {},
  add: () => {},
};

vi.mock("aws-sdk", () => ({
  CloudWatch: vi.fn(() => mockCloudWatch),
  config: { update: vi.fn() },
}));

vi.mock("../utils/index.js", () => ({
  logger: mockLogger,
  sendMetric: vi.fn(),
}));

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.pet_profiles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(100) NOT NULL,
      hunger INTEGER DEFAULT 100,
      last_fed_at TIMESTAMP DEFAULT NOW()
    )
  `);
});

afterEach(async () => {
  await pool.query("DELETE FROM public.pet_profiles WHERE name LIKE 'Test%'");
});

afterAll(async () => {
  await pool.query("DELETE FROM public.pet_profiles WHERE name LIKE 'Test%'");
  await pool.end();
});
