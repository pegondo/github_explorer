"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export type Props = {
  scale: d3.ScaleBand<string>;
  transform: string;
};

const AxisBottom = ({ scale, transform }: Props) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    d3.select(ref.current).call(d3.axisBottom(scale));
  }, [scale]);

  return <g ref={ref} transform={transform} />;
};

export default AxisBottom;
