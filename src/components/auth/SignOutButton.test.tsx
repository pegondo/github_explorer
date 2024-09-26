import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import SignOutButton from "./SignOutButton";

// Mock the sign out.
import * as nextAuth from "next-auth/react";
jest.mock("next-auth/react");
const signOutMock = nextAuth.signOut as jest.Mock;

describe("<SignOutButton />", () => {
  const setup = () => {
    render(<SignOutButton />);
    return screen.getByTestId("sign-out");
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the sign in.
    signOutMock.mockReturnValue(undefined);
  });

  it("should render", () => {
    const button = setup();

    expect(button).toBeInTheDocument();
  });

  it("should trigger the sign out action", () => {
    const button = setup();

    fireEvent.click(button);

    expect(signOutMock).toHaveBeenCalledTimes(1);
  });
});
