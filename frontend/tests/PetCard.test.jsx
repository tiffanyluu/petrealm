import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PetCard from "../src/app/components/PetCard.jsx";

describe("PetCard Component", () => {
  const mockProps = {
    name: "Fluffy",
    type: "Dragon",
    hunger: 75,
    onClick: vi.fn(),
  };

  it("should render pet information correctly", () => {
    render(<PetCard {...mockProps} />);

    expect(screen.getByText("Fluffy")).toBeInTheDocument();
    expect(screen.getByText("Dragon")).toBeInTheDocument();
    expect(screen.getByText("Hunger: 75%")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    render(<PetCard {...mockProps} />);

    const card = screen.getByText("Fluffy").closest("div");
    fireEvent.click(card);

    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
