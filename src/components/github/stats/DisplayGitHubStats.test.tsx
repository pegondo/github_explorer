import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import DisplayGitHubStats from "./DisplayGitHubStats";

// Mock useGitHubStats
import * as useGitHubStats from "@/hooks/github/useGitHubStats";
jest.mock("@/hooks/github/useGitHubStats");
const useGitHubStatsMock = useGitHubStats.default as jest.Mock;

// Mock useDeviceType
import * as useDeviceType from "@/hooks/useDeviceType";
jest.mock("@/hooks/useDeviceType");
const useDeviceTypeMock = useDeviceType.default as jest.Mock;

describe("<DisplayGitHubStats />", () => {
  const setup = () => {
    render(<DisplayGitHubStats />);

    const element = screen.queryByTestId("display-github-stats");
    const error = screen.queryByTestId("display-github-stats-error");
    const contributionsPerYear = screen.queryByTestId(
      "display-github-stats-year"
    );
    const contributionsPerMonth = screen.queryByTestId(
      "display-github-stats-month"
    );

    return { element, error, contributionsPerYear, contributionsPerMonth };
  };

  const mockUseGitHubStats = (
    includeData: boolean = true,
    includeError: boolean = false
  ) => {
    useGitHubStatsMock.mockReturnValue({
      data: includeData
        ? {
            anualContributions: [
              {
                year: "2023",
                numContributions: 100,
              },
              {
                year: "2024",
                numContributions: 200,
              },
            ],
            monthContributions: {
              January: 20,
              February: 10,
              March: 1,
              April: 14,
              May: 9,
              June: 10,
              July: 22,
              August: 8,
              September: 7,
              October: 0,
              November: 0,
              December: 0,
            },
          }
        : undefined,
      error: includeError ? new Error("error") : undefined,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useDeviceType
    useDeviceTypeMock.mockReturnValue({
      deviceType: "desktop",
      width: 1920,
    });
  });

  it("should render", () => {
    mockUseGitHubStats();

    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render an error if useGitHubStats returns an error and some data", () => {
    // Mock useGitHubStats
    mockUseGitHubStats(true, true);

    const { error } = setup();

    expect(error).toBeInTheDocument();
  });

  it("should render an error if useGitHubStats returns an error and no data", () => {
    // Mock useGitHubStats
    mockUseGitHubStats(false, true);

    const { error } = setup();

    expect(error).toBeInTheDocument();
  });

  it("should render an error if useGitHubStats returns a no error and no data", () => {
    // Mock useGitHubStats
    mockUseGitHubStats(false, false);

    const { error } = setup();

    expect(error).toBeInTheDocument();
  });

  it("should display the chart with the contributions of the year", () => {
    mockUseGitHubStats();

    const { contributionsPerYear } = setup();

    expect(contributionsPerYear).toBeInTheDocument();
  });

  it("should display the chart with the contributions of the month", () => {
    mockUseGitHubStats();

    const { contributionsPerMonth } = setup();

    expect(contributionsPerMonth).toBeInTheDocument();
  });
});
