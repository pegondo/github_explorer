import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import SignInButton from "./SignInButton";

// Mock the sign in.
import * as nextAuth from "next-auth/react";
jest.mock("next-auth/react");
const signInMock = nextAuth.signIn as jest.Mock;

describe("<SignInButton />", () => {
  const setup = () => {
    render(<SignInButton />);
    return screen.getByTestId("sign-in");
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the sign in.
    signInMock.mockReturnValue(undefined);
  });

  it("should render", () => {
    const button = setup();

    expect(button).toBeInTheDocument();
  });

  it("should trigger the sign in action", () => {
    const button = setup();

    fireEvent.click(button);

    expect(signInMock).toHaveBeenCalledTimes(1);
  });
});
