"use client";

import React from "react";
import useGitHubStats from "@/hooks/github/useGitHubStats";
import BarChart from "../../graph/BarChart/BarChart";

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Displays a bar chart with the GitHub stats of the user that's
 * logged in.
 */
const DisplayGitHubStats = () => {
  const { data: stats, error } = useGitHubStats();

  if (error || !stats) {
    return <p>Stats unavailable, please try later.</p>;
  }

  return (
    <div className="flex gap-10">
      <div>
        <p className="pl-5">Interactions per year</p>
        <BarChart
          data={stats.anualContributions.map(({ year, numContributions }) => ({
            key: year,
            value: numContributions,
          }))}
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
          width={900}
        />
      </div>
    </div>
  );
};

export default DisplayGitHubStats;
