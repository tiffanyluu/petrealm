import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import HungerBar from "../src/app/components/HungerBar";

describe("HungerBar Component", () => {
  it("should render green bar for high hunger", () => {
    const { container } = render(<HungerBar hunger={80} />);
    const bar = container.querySelector(".bg-green-500");
    expect(bar).toBeInTheDocument();
    expect(bar.style.width).toBe("80%");
  });

  it("should render yellow bar for medium hunger", () => {
    const { container } = render(<HungerBar hunger={50} />);
    const bar = container.querySelector(".bg-yellow-500");
    expect(bar).toBeInTheDocument();
  });

  it("should render red bar for low hunger", () => {
    const { container } = render(<HungerBar hunger={20} />);
    const bar = container.querySelector(".bg-red-500");
    expect(bar).toBeInTheDocument();
  });
});
