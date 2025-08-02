import { describe, it, expect } from "vitest";
import { addPet } from "../src/controllers/add-pet.js";

describe("addPet Controller", () => {
  it("should add a pet with valid name", async () => {
    const result = await addPet("Fluffy");

    expect(result).toBeDefined();
    expect(result.name).toBe("Fluffy");
    expect(result.hunger).toBe(100);
    expect(["Dragon", "Unicorn", "Phoenix", "Griffin", "Pegasus"]).toContain(
      result.type
    );
  });

  it("should throw error when name is missing", async () => {
    await expect(addPet()).rejects.toThrow("Pet name is required");
    await expect(addPet("")).rejects.toThrow("Pet name is required");
  });
});
