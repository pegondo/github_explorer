import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import HomePage from "./page";

// Mock the useRouter hook.
import * as navigation from "next/navigation";
jest.mock("next/navigation");
const useRouterMock = navigation.useRouter as jest.Mock;

// Mock Home
import * as Home from "@/components/home/Home";
jest.mock("@/components/home/Home");
const HomeMock = Home.default as jest.Mock;

describe("The Home page", () => {
  const setup = () => render(<HomePage />);

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the useRouter hook.
    useRouterMock.mockReturnValue({
      prefetch: () => {},
    });

    // Mock Home
    HomeMock.mockReturnValue(<></>);
  });

  it("should render Home", () => {
    setup();

    expect(HomeMock).toHaveBeenCalledTimes(1);
  });
});
