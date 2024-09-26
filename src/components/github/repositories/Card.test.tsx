import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Card, { Props as CardProps } from "./Card";

describe("<Card />", () => {
  const defaultProps: CardProps = {
    children: <p>Children</p>,
    "data-testid": "card",
  };
  const setup = (props: CardProps = defaultProps) => {
    render(<Card {...props} />);

    const element = screen.getByTestId("card");
    const child = element.children?.length ? element.children[0] : undefined;

    return { element, child };
  };

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the children", () => {
    const { child } = setup();

    expect(child).toBeInTheDocument();
    expect(child?.textContent).toEqual(
      render(defaultProps.children).container.textContent
    );
  });
});
