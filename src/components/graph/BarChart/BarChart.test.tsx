import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import BarChart, { Props as BarChartProps } from "./BarChart";

describe("<BarChart />", () => {
  const defaultProps: BarChartProps = {
    data: [
      {
        key: "key-1",
        value: 1,
      },
      {
        key: "key-2",
        value: 2,
      },
    ],
    "data-testid": "card",
  };
  const setup = (props: BarChartProps = defaultProps) => {
    render(<BarChart {...props} />);

    const element = screen.getByTestId("card");
    const bottomAxis = screen.getByTestId("bar-chart-axis-bottom");
    const leftAxis = screen.getByTestId("bar-chart-axis-left");
    const bars = screen.getAllByTestId("bar-chart-bars");

    return { element, bottomAxis, leftAxis, bars };
  };

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the bottom axis", () => {
    const { bottomAxis } = setup();

    expect(bottomAxis).toBeInTheDocument();
  });

  it("should render the left axios", () => {
    const { leftAxis } = setup();

    expect(leftAxis).toBeInTheDocument();
  });

  it("should render the bars", () => {
    const { bars } = setup();

    expect(bars.length).toBeGreaterThan(0);
    for (const bar of bars) {
      expect(bar).toBeInTheDocument();
    }
  });
});
