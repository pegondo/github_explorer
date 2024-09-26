import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import ProfilePage from "./page";

// Mock getServerSession
import * as getServerSession from "next-auth";
jest.mock("next-auth");
const getServerSessionMock = getServerSession.getServerSession as jest.Mock;

// Mock useSession
import * as useSession from "next-auth/react";
jest.mock("next-auth/react");
const useSessionMock = useSession.useSession as jest.Mock;

// Mock DisplayGitHubStats
import * as DisplayGitHubStats from "@/components/github/stats/DisplayGitHubStats";
jest.mock("@/components/github/stats/DisplayGitHubStats");
const DisplayGitHubStatsMock = DisplayGitHubStats.default as jest.Mock;

describe("The Profile page", () => {
  const mockUseServerSession = (
    provideUserName: boolean = true,
    provideUserImage = true
  ) => {
    getServerSessionMock.mockResolvedValue({
      user: {
        name: provideUserName ? "<user-name>" : undefined,
        image: provideUserImage ? "http://localhost:3000" : undefined,
      },
    });
  };
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

  const setup = async () => {
    render(await ProfilePage());

    const element = screen.getByTestId("profile-page");
    const userName = screen.getByTestId("username");
    const userImage = screen.queryByTestId("user-image");

    return { element, userName, userImage };
  };

  beforeEach(() => {
    // Mock DisplayGitHubStats
    DisplayGitHubStatsMock.mockReturnValue(<></>);
  });

  it("should render", async () => {
    mockUseSession();
    mockUseServerSession();

    const { element } = await setup();

    expect(element).toBeInTheDocument();
  });

  it("should render DisplayGitHubStats", async () => {
    mockUseSession();
    mockUseServerSession();

    await setup();

    expect(DisplayGitHubStatsMock).toHaveBeenCalledTimes(1);
  });

  it("should render the user name if the session provides it", async () => {
    mockUseSession();
    mockUseServerSession();

    const { userName } = await setup();

    expect(userName).toBeInTheDocument();
  });

  it("should render the user image if the session provides it", async () => {
    mockUseSession();
    mockUseServerSession();

    const { userImage } = await setup();

    expect(userImage).toBeInTheDocument();
  });

  it("should render the user name unknown if the session doesn't provide it", async () => {
    mockUseSession();
    mockUseServerSession(false, true);

    const { userName } = await setup();

    expect(userName.textContent).toContain("unknown");
  });

  it("shouldn't render the user image if the session doesn't provide it", async () => {
    mockUseSession();
    mockUseServerSession(true, false);

    const { userImage } = await setup();

    expect(userImage).not.toBeInTheDocument();
  });
});
