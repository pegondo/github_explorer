"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export type Props = {
  scale: d3.ScaleBand<string>;
  transform: string;
  isMobile?: boolean;
};

const AxisBottom = ({ scale, transform, isMobile }: Props) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const selection = d3.select(ref.current).call(d3.axisBottom(scale));
    if (isMobile) {
      // Rotate the text in the X axis.
      selection
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    }
  }, [scale, isMobile]);

  return <g ref={ref} transform={transform} />;
};

export default AxisBottom;
