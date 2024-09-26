import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock useSession
import * as useSession from "next-auth/react";
jest.mock("next-auth/react");
const useSessionMock = useSession.useSession as jest.Mock;

describe("<Navbar />", () => {
  const setup = () => {
    render(<Navbar />);

    const element = screen.getByTestId("navbar");
    const home = screen.queryByTestId("li-home");
    const explore = screen.queryByTestId("li-explore");
    const signIn = screen.queryByTestId("li-sign-in");
    const profile = screen.queryByTestId("li-profile");
    const signOut = screen.queryByTestId("li-sign-out");
    const theme = screen.queryByTestId("li-theme");

    return { element, home, explore, signIn, profile, signOut, theme };
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    mockUseSession();

    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the home, explore, profile, sign out and theme options, and not render the sign in option if the user is logged in", () => {
    mockUseSession();

    const { home, explore, profile, signOut, theme, signIn } = setup();

    expect(home).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(signOut).toBeInTheDocument();
    expect(theme).toBeInTheDocument();

    expect(signIn).not.toBeInTheDocument();
  });

  it("should render the home, explore, sign in and theme options, and not render the profile and sign out options if the user is not logged in", () => {
    mockUseSession(false);

    const { home, explore, signIn, theme, profile, signOut } = setup();

    expect(home).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    expect(theme).toBeInTheDocument();

    expect(profile).not.toBeInTheDocument();
    expect(signOut).not.toBeInTheDocument();
  });
});
