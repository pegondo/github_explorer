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

  if (!!error || !stats) {
    return (
      <div data-testid="display-github-stats-error">
        <p>Stats unavailable, please try later.</p>
      </div>
    );
  }

  return (
    <div className="md:flex md:gap-10" data-testid="display-github-stats">
      <div className="shrink-0" data-testid="display-github-stats-year">
        <p className="pl-5">Interactions per year</p>
        <BarChart
          data={stats.anualContributions.map(({ year, numContributions }) => ({
            key: year,
            value: numContributions,
          }))}
          width={isMobile ? width : 500}
          data-testid="year-interactions-chart"
        />
      </div>
      <div data-testid="display-github-stats-month">
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
          data-testid="month-interactions-chart"
        />
      </div>
    </div>
  );
};

export default DisplayGitHubStats;
