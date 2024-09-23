"use client";

import React from "react";
import useGitHubStats from "@/hooks/github/useGitHubStats";
import BarChart from "../../graph/BarChart/BarChart";
import useDeviceType from "@/hooks/useDeviceType";

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Displays a bar chart with the GitHub stats of the user that's
 * logged in.
 */
const DisplayGitHubStats = () => {
  const { data: stats, error } = useGitHubStats();
  const { deviceType, width } = useDeviceType();
  const isMobile = deviceType === "mobile";

  if (error || !stats) {
    return <p>Stats unavailable, please try later.</p>;
  }

  return (
    <div className="md:flex md:gap-10">
      <div className="shrink-0">
        <p className="pl-5">Interactions per year</p>
        <BarChart
          data={stats.anualContributions.map(({ year, numContributions }) => ({
            key: year,
            value: numContributions,
          }))}
          width={isMobile ? width : 500}
        />
      </div>
      <div>
        <p className="pl-5">Interactions per month in {CURRENT_YEAR}</p>
        <BarChart
          data={Object.entries(stats.monthContributions).map(
            ([month, numContributions]) => ({
              key: month,
              value: numContributions,
            })
          )}
          width={isMobile ? width : 900}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default DisplayGitHubStats;
