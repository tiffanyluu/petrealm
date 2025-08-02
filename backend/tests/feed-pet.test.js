import { describe, it, expect, beforeEach } from "vitest";
import { addPet } from "../src/controllers/add-pet.js";
import { feedPet } from "../src/controllers/feed-pet.js";
import pool from "../src/config/index.js";

describe("feedPet Controller", () => {
  let testPet;

  beforeEach(async () => {
    testPet = await addPet("TestPet");
  });

  it("should increase pet hunger by 10", async () => {
    await pool.query(
      "UPDATE public.pet_profiles SET hunger = 50 WHERE id = $1",
      [testPet.id]
    );

    const result = await feedPet(testPet.id);
    expect(result).not.toBeNull();
    expect(result.hunger).toBe(60);
  });

  it("should cap hunger at 100", async () => {
    await pool.query(
      "UPDATE public.pet_profiles SET hunger = 95 WHERE id = $1",
      [testPet.id]
    );

    const result = await feedPet(testPet.id);
    expect(result.hunger).toBe(100);
  });

  it("should throw error when pet ID is missing", async () => {
    await expect(feedPet()).rejects.toThrow("Pet ID is required");
  });

  it("should return null for non-existent pet", async () => {
    const result = await feedPet(999);
    expect(result).toBeNull();
  });
});
