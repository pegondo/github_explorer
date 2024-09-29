"use client";

import React from "react";
import useGitHubStats from "@/hooks/github/useGitHubStats";
import BarChart from "../../graph/BarChart/BarChart";
import useDeviceType from "@/hooks/useDeviceType";
import Card from "@/components/card/Card";

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
    <Card>
      <div
        className="2xl:flex 2xl:gap-12 2xl:justify-center"
        data-testid="display-github-stats"
      >
        <div className="shrink-0" data-testid="display-github-stats-year">
          <p className="text-xl pl-5">Interactions per year</p>
          <BarChart
            data={stats.anualContributions.map(
              ({ year, numContributions }) => ({
                key: year,
                value: numContributions,
              })
            )}
            width={isMobile ? (width ? width - 80 : undefined) : 500}
            data-testid="year-interactions-chart"
          />
        </div>
        <div className="shrink-0" data-testid="display-github-stats-month">
          <p className="text-xl pl-5">
            Interactions per month in {CURRENT_YEAR}
          </p>
          <BarChart
            data={Object.entries(stats.monthContributions).map(
              ([month, numContributions]) => ({
                key: month,
                value: numContributions,
              })
            )}
            width={isMobile ? (width ? width - 80 : undefined) : 900}
            isMobile={isMobile}
            data-testid="month-interactions-chart"
          />
        </div>
      </div>
    </Card>
  );
};

export default DisplayGitHubStats;
