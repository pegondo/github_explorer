import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import useGitHubStats, { apiResponseToStats } from "./useGitHubStats";

// Mock useSession
import * as useSession from "next-auth/react";
jest.mock("next-auth/react");
const useSessionMock = useSession.useSession as jest.Mock;

// Mock useGitHubSessionData
import * as useGitHubSessionData from "./useGitHubSessionData";
jest.mock("./useGitHubSessionData");
const useGitHubSessionDataMock = useGitHubSessionData.default as jest.Mock;

// Mock axios
import * as axios from "axios";
jest.mock("axios");
const axiosMock = axios.default as unknown as jest.Mock;

describe("useGitHubStats", () => {
  const mockUseSession = (isLoggedIn: boolean = true) => {
    useSessionMock.mockReturnValue(
      isLoggedIn
        ? {
            data: "<session-data>",
          }
        : {
            data: undefined,
          }
    );
  };
  const defaultApiResponse = {
    data: {
      total: {
        "2023": 12,
        "2024": 10,
      },
      contributions: [
        {
          date: new Date().toString(),
          count: 10,
        },
        {
          date: new Date().setDate(new Date().getDate() + 1).toString(),
          count: 12,
        },
      ],
    },
  };
  const defaultData = apiResponseToStats(defaultApiResponse.data);
  const mockApiResponse = (success: boolean = true) => {
    if (!success) {
      axiosMock.mockRejectedValue("error");
      return;
    }
    axiosMock.mockResolvedValue(defaultApiResponse);
  };

  const setup = () => renderHook(() => useGitHubStats());

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useGitHubSessionData
    useGitHubSessionDataMock.mockReturnValue({
      data: {
        username: "<username>",
      },
      error: undefined,
    });
  });

  it("should return the default values the first time it renders", () => {
    mockUseSession();
    mockApiResponse();

    const { result } = setup();

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("should return no data and no error if the user isn't logged in", async () => {
    mockUseSession(false);
    mockApiResponse();

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeUndefined();
    });
  });

  it("should return the data and no value if the call to the API succeeded", async () => {
    mockUseSession();
    mockApiResponse();

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.data).toEqual(defaultData);
      expect(result.current.error).toBeUndefined();
    });
  });

  it("should return an error and no data if the call to the API didn't succeed", async () => {
    mockUseSession();
    mockApiResponse(false);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).not.toBeUndefined();
    });
  });
});
