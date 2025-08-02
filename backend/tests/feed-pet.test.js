import { describe, it, expect } from "vitest";
import { addPet } from "../src/controllers/add-pet.js";
import { feedPet } from "../src/controllers/feed-pet.js";
import pool from "../src/config/index.js";

describe("feedPet Controller", () => {
  it("should increase pet hunger by 10", async () => {
    const testPet = await addPet("TestHungerIncrease");

    const updateResult = await pool.query(
      "UPDATE public.pet_profiles SET hunger = 50 WHERE id = $1 RETURNING *",
      [testPet.id]
    );

    expect(updateResult.rows).toHaveLength(1);
    expect(updateResult.rows[0].hunger).toBe(50);

    const result = await feedPet(testPet.id);
    expect(result).not.toBeNull();
    expect(result.hunger).toBe(60); // 50 + 10 = 60
    expect(result.id).toBe(testPet.id);
  });

  it("should cap hunger at 100 when feeding full pet", async () => {
    const testPet = await addPet("TestCapFull");

    const result = await feedPet(testPet.id);
    expect(result).not.toBeNull();
    expect(result.hunger).toBe(100);
  });

  it("should cap hunger at 100 when near limit", async () => {
    const testPet = await addPet("TestCapLimit");

    const updateResult = await pool.query(
      "UPDATE public.pet_profiles SET hunger = 95 WHERE id = $1 RETURNING *",
      [testPet.id]
    );

    expect(updateResult.rows).toHaveLength(1);
    expect(updateResult.rows[0].hunger).toBe(95);

    const result = await feedPet(testPet.id);
    expect(result).not.toBeNull();
    expect(result.hunger).toBe(100);
  });

  it("should throw error when pet ID is missing", async () => {
    await expect(feedPet()).rejects.toThrow("Pet ID is required");
    await expect(feedPet("")).rejects.toThrow("Pet ID is required");
    await expect(feedPet(null)).rejects.toThrow("Pet ID is required");
  });

  it("should return null for non-existent pet", async () => {
    const result = await feedPet(999999);
    expect(result).toBeNull();
  });
});
