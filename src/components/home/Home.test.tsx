import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

// Mock the useRouter hook.
import * as navigation from "next/navigation";
jest.mock("next/navigation");
const useRouterMock = navigation.useRouter as jest.Mock;

describe("<AxisBottom />", () => {
  const setup = () => {
    render(<Home />);

    const element = screen.getByTestId("home-component");
    const header = screen.getByTestId("home-page-header");

    return { element, header };
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the useRouter hook.
    useRouterMock.mockReturnValue({
      prefetch: () => {},
    });
  });

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the header", () => {
    const { header } = setup();

    expect(header).toBeInTheDocument();
  });
});
