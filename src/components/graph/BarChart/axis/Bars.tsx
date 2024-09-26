import React from "react";
import { Props as BarChartProps } from "../BarChart";
import { Props as AxisBottomProps } from "./AxisBottom";
import { Props as AxisLeftProps } from "./AxisLeft";

type Props = {
  data: BarChartProps["data"];
  height: number;
  scaleX: AxisBottomProps["scale"];
  scaleY: AxisLeftProps["scale"];
  "data-testid"?: string;
};

function Bars({
  data,
  height,
  scaleX,
  scaleY,
  "data-testid": dataTestId,
}: Props) {
  return (
    <>
      {data.map(({ key, value }) => (
        <rect
          key={`bar-${key}`}
          x={scaleX(key)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="var(--primary)"
          data-testid={dataTestId}
        />
      ))}
    </>
  );
}

export default Bars;
