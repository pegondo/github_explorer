import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { Props as ButtonProps } from "./Button";

describe("<Button />", () => {
  const testId = "button";
  const defaultProps: ButtonProps = {
    onClick: () => {},
    children: <p>Children</p>,
    "data-testid": testId,
  };
  const setup = (
    props: ButtonProps = defaultProps
  ): { element: HTMLElement; child?: Element } => {
    render(<Button {...props} />);

    const element = screen.getByTestId(testId);
    const child = element.children?.length ? element.children[0] : undefined;

    return { element, child };
  };

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render its child", () => {
    const { child } = setup();

    expect(child).toBeInTheDocument();
    expect(child?.textContent).toEqual(
      render(defaultProps.children).container.textContent
    );
  });

  it("should trigger the onClick", () => {
    const handleClick = jest.fn();
    const { element } = setup({ ...defaultProps, onClick: handleClick });

    fireEvent.click(element);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
