"use client";

import * as d3 from "d3";
import AxisBottom from "./axis/AxisBottom";
import AxisLeft from "./axis/AxisLeft";
import Bars from "./axis/Bars";

type Data = {
  key: string;
  value: number;
};

export type Props = {
  data: Data[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  isMobile?: boolean;
  "data-testid"?: string;
};

const BarChart = ({
  data,
  width = 500,
  height = 500,
  margin = { top: 10, right: 10, bottom: 60, left: 40 },
  isMobile,
  "data-testid": dataTestId,
}: Props) => {
  const effectiveWidth = width - margin.left - margin.right;
  const effectiveHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map(({ key }) => key))
    .range([0, effectiveWidth])
    .padding(0.26);
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([effectiveHeight, 0])
    .nice();

  return (
    <svg
      width={effectiveWidth + margin.left + margin.right}
      height={effectiveHeight + margin.top + margin.bottom}
      data-testid={dataTestId}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          scale={xScale}
          transform={`translate(0, ${effectiveHeight})`}
          isMobile={isMobile}
          data-testid="bar-chart-axis-bottom"
        />
        <AxisLeft scale={yScale} data-testid="bar-chart-axis-left" />
        <Bars
          data={data}
          height={effectiveHeight}
          scaleX={xScale}
          scaleY={yScale}
          data-testid="bar-chart-bars"
        />
      </g>
    </svg>
  );
};

export default BarChart;
