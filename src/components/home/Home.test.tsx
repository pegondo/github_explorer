import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

// Mock the useRouter hook.
import * as navigation from "next/navigation";
jest.mock("next/navigation");
const useRouterMock = navigation.useRouter as jest.Mock;

// Mock the useSession hook.
import * as useSession from "next-auth/react";
jest.mock("next-auth/react");
const useSessionMock = useSession.useSession as jest.Mock;

describe("<AxisBottom />", () => {
  const setup = () => {
    render(<Home />);

    const element = screen.getByTestId("home-component");
    const activityCard = screen.getByTestId("home-activity-card");
    const signInButton = screen.queryByTestId("home-sign-in-button");
    const profileButton = screen.queryByTestId("home-profile-button");
    const exploreCard = screen.getByTestId("home-explore-card");

    return {
      element,
      activityCard,
      signInButton,
      profileButton,
      exploreCard,
    };
  };

  const mockUseRouter = (
    prefetch: () => void = () => {},
    push: () => void = () => {}
  ) => {
    useRouterMock.mockReturnValue({
      prefetch,
      push,
    });
  };

  const mockUseSession = (isLoggedIn: boolean = true) => {
    useSessionMock.mockReturnValue({
      data: isLoggedIn ? "<user-data>" : undefined,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    mockUseRouter();
    mockUseSession();

    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the activity card", () => {
    mockUseRouter();
    mockUseSession();

    const { activityCard } = setup();

    expect(activityCard).toBeInTheDocument();
  });

  it("should show the sign in button if the user isn't signed in", () => {
    mockUseRouter();
    mockUseSession(false);

    const { signInButton } = setup();

    expect(signInButton).toBeInTheDocument();
  });

  it("should show the profile button if the user is signed in", () => {
    mockUseRouter();
    mockUseSession();

    const { profileButton } = setup();

    expect(profileButton).toBeInTheDocument();
  });

  it("should render the explore card", () => {
    mockUseRouter();
    mockUseSession();

    const { exploreCard } = setup();

    expect(exploreCard).toBeInTheDocument();
  });
});
