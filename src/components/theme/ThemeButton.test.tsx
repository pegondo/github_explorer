import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import ThemeButton from "./ThemeButton";

// Mock useTheme
import * as useTheme from "next-themes";
jest.mock("next-themes");
const useThemeMock = useTheme.useTheme as jest.Mock;

describe("<ThemeButton />", () => {
  const setup = () => {
    render(<ThemeButton />);

    return screen.queryByTestId("change-theme");
  };

  const mockUseTheme = (theme: "light" | "dark" | undefined) => {
    useThemeMock.mockReturnValue({
      theme,
      setTheme: () => {},
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    mockUseTheme("light");

    const element = setup();

    expect(element).toBeInTheDocument();
  });

  it("should not render if useTheme returns falsy", () => {
    mockUseTheme(undefined);

    const element = setup();

    expect(element).not.toBeInTheDocument();
  });

  it("should call setTheme when clicked", () => {
    mockUseTheme("light");

    const element = setup();

    expect(element).not.toBeNull();
    fireEvent.click(element!);

    expect(useThemeMock).toHaveBeenCalledTimes(1);
  });
});
