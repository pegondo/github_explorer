import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Loading", () => {
  const setup = () => {
    render(<Loading />);

    return screen.getByTestId("loading");
  };

  it("should render", () => {
    const element = setup();

    expect(element).toBeInTheDocument();
  });
});
