"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export type Props = {
  scale: d3.ScaleLinear<number, number, never>;
  "data-testid"?: string;
};

const AxisLeft = ({ scale, "data-testid": dataTestId }: Props) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    d3.select(ref.current).call(d3.axisLeft(scale));
  }, [scale]);

  return <g ref={ref} data-testid={dataTestId} />;
};

export default AxisLeft;
