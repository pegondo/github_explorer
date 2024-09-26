import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import SignInPage from "./page";

// Mock getServerSession
import * as getServerSession from "next-auth";
jest.mock("next-auth");
const getServerSessionMock = getServerSession.getServerSession as jest.Mock;

// Mock redirect
import * as redirect from "next/navigation";
jest.mock("next/navigation");
const redirectMock = redirect.redirect as unknown as jest.Mock;

describe("The Sign In page", () => {
  const setup = async () => {
    render(await SignInPage());

    const element = screen.getByTestId("sign-in-page");

    return { element };
  };

  const mockGetServerSession = (loggedIn: boolean = true) => {
    getServerSessionMock.mockResolvedValue(
      loggedIn
        ? {
            accessToken: "<access-token>",
          }
        : undefined
    );
  };

  beforeEach(() => {
    // Mock redirect
    redirectMock.mockReturnValue(undefined);
  });

  it("should render", async () => {
    mockGetServerSession();

    const { element } = await setup();

    expect(element).toBeInTheDocument();
  });

  it("should redirect to /profile if the user is logged in", async () => {
    mockGetServerSession();

    await setup();

    expect(redirectMock).toHaveBeenCalledWith("/profile");
  });

  it("shouldn't redirect if the user isn't logged in", async () => {
    mockGetServerSession(false);

    await setup();

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
