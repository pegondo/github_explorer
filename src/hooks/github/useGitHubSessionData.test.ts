import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import useGitHubSessionData from "./useGitHubSessionData";

import GitHubClient from "@/services/api/github/GitHubClient";
import { ExtendedSession } from "@/app/api/auth/[...nextauth]/options";

describe("useGitHubSessionData", () => {
  const defaultUsername = "<username>";
  const defaultError = new Error("error");
  const mockGitHubClient = (success: boolean = true) => {
    const mock = success
      ? jest.fn().mockResolvedValue({
          login: defaultUsername,
        })
      : jest.fn().mockRejectedValue(defaultError);
    GitHubClient.prototype.getUser = mock;
  };

  const defaultSession: ExtendedSession = {
    accessToken: "<access-token>",
    expires: new Date().toString(),
  };
  const setup = (session: ExtendedSession = defaultSession) =>
    renderHook(() => useGitHubSessionData(session));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the default values the first time it renders", () => {
    mockGitHubClient();

    const { result } = setup();

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it("should return the mocked data after the first renders", async () => {
    mockGitHubClient();

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.data).toMatchObject({
        username: defaultUsername,
      });
      expect(result.current.error).toBeUndefined();
    });
  });

  it("should return an error if the GitHub client rejects the promise", async () => {
    mockGitHubClient(false);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBe(defaultError);
    });
  });
});
