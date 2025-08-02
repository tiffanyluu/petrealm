import "@testing-library/jest-dom";
import { createElement } from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useParams: () => ({ id: "1" }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/image", () => ({
  default: (props) => createElement("img", props),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: (props) => createElement("div", props),
  },
}));

process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
