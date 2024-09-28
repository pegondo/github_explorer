import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import ExplorePage from "./page";
import { getRandomRepositoryOfTheDay } from "@/services/github/repositories";

import GitHubClient, {
  Issues,
  Releases,
} from "@/services/api/github/GitHubClient";

// Mock GitHubReleases
import * as GitHubReleases from "@/components/github/repositories/GitHubRelease/GitHubReleases";
jest.mock("@/components/github/repositories/GitHubRelease/GitHubReleases");
const GitHubReleasesMock = GitHubReleases.default as jest.Mock;

// Mock GitHubIssues
import * as GitHubIssues from "@/components/github/repositories/GitHubIssue/GitHubIssues";
jest.mock("@/components/github/repositories/GitHubIssue/GitHubIssues");
const GitHubIssuesMock = GitHubIssues.default as jest.Mock;

// Mock getServerSession
import * as getServerSession from "next-auth";
jest.mock("next-auth");
const getServerSessionMock = getServerSession.getServerSession as jest.Mock;

describe("The Explore page", () => {
  const defaultReleases: Releases = [
    {
      tag_name: "<tag-1>",
      name: "<name-1>",
      body: "<body-1>",
      html_url: "http://localhost:3000",
      tarball_url: "http://localhost:3000",
      draft: true,
      prerelease: true,
      author: {
        name: "<author-name-1>",
        html_url: "http://localhost:3000",
      },
    },
    {
      tag_name: "<tag-2>",
      name: "<name-2>",
      body: "<body-2>",
      html_url: "http://localhost:3000",
      tarball_url: "http://localhost:3000",
      draft: true,
      prerelease: true,
      author: {
        name: "<author-name-2>",
        html_url: "http://localhost:3000",
      },
    },
  ];
  const defaultReleasesError = new Error("releases error");
  const defaultIssues: Issues = [
    {
      title: "<title-1>",
      number: 1,
      body: "<body-of-the-issue-1>",
      state: "closed",
      html_url: "http://localhost:3000",
      user: {
        login: "<username-1>",
        html_url: "http://localhost:3000",
        name: "<user-name-1>",
      },
      assignee: {
        login: "<assignee-username-1>",
        html_url: "http://localhost:3000",
        name: "<assignee-name-1>",
      },
    },
    {
      title: "<title-2>",
      number: 1,
      body: "<body-of-the-issue-2>",
      state: "closed",
      html_url: "http://localhost:3000",
      user: {
        login: "<username-2>",
        html_url: "http://localhost:3000",
        name: "<user-name-2>",
      },
      assignee: {
        login: "<assignee-username-2>",
        html_url: "http://localhost:3000",
        name: "<assignee-name-2>",
      },
    },
  ];
  const defaultIssuesError = new Error("issues error");
  const mockGitHubClient = (
    success: { releases: boolean; issues: boolean } = {
      releases: true,
      issues: true,
    }
  ) => {
    const mockReleases = success.releases
      ? jest.fn().mockResolvedValue(defaultReleases)
      : jest.fn().mockRejectedValue(defaultReleasesError);
    const mockIssues = success.issues
      ? jest.fn().mockResolvedValue(defaultIssues)
      : jest.fn().mockRejectedValue(defaultIssuesError);

    GitHubClient.prototype.getReleases = mockReleases;
    GitHubClient.prototype.getIssues = mockIssues;

    return {
      mockReleases,
      mockIssues,
    };
  };

  const setup = async () => {
    render(await ExplorePage());

    const element = screen.queryByTestId("explore-page");
    const repoOtd = screen.queryByTestId("repo-otd-header");
    const error = screen.queryByTestId("github-client-error");

    return { element, repoOtd, error };
  };

  beforeEach(() => {
    // Mock GitHubReleases
    GitHubReleasesMock.mockReturnValue(<></>);
    // Mock GitHubIssues
    GitHubIssuesMock.mockReturnValue(<></>);
    // Mock getServerSession
    getServerSessionMock.mockResolvedValue({
      accessToken: "<access-token>",
    });
  });

  it("should render", async () => {
    mockGitHubClient();

    const { element } = await setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the name of the repository of the day", async () => {
    mockGitHubClient();

    const { repoOtd } = await setup();

    const actualRepoOtd = getRandomRepositoryOfTheDay();
    expect(repoOtd?.textContent).toContain(actualRepoOtd);
  });

  it("should render the GitHub releases and issues", async () => {
    const { mockReleases, mockIssues } = mockGitHubClient();

    await setup();

    expect(mockReleases).toHaveBeenCalledTimes(1);
    expect(mockIssues).toHaveBeenCalledTimes(1);
  });

  it("should render the error screen when the request for GitHub issues is rejected", async () => {
    mockGitHubClient({ issues: false, releases: true });

    const { error } = await setup();

    expect(error).toBeInTheDocument();
  });

  it("should render the error screen when the request for GitHub releases is rejected", async () => {
    mockGitHubClient({ issues: true, releases: false });

    const { error } = await setup();

    expect(error).toBeInTheDocument();
  });

  it("should render the error screen when the request for GitHub issues and the releases are rejected", async () => {
    mockGitHubClient({ issues: false, releases: false });

    const { error } = await setup();

    expect(error).toBeInTheDocument();
  });
});
