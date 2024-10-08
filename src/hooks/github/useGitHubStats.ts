import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/app/api/auth/[...nextauth]/options";
import useGitHubSessionData from "./useGitHubSessionData";
import { GET_GITHUB_CONTRIBUTIONS } from "@/constants";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CURRENT_YEAR = new Date().getFullYear();

interface ContributionsResponse {
  total: { [key: string]: number };
  contributions: {
    date: string;
    count: number;
  }[];
}

/**
 * The GitHub stats of the user that's logged in.
 */
interface GitHubStats {
  /**
   * The number of contributions per year of the GitHub user
   * that's logged in.
   */
  anualContributions: {
    year: string;
    numContributions: number;
  }[];
  /**
   * The number of GitHub contributions for the current year of
   * the user that's logged in. It has months of the year as
   * keys and number of contributions as values.
   */
  monthContributions: { [key: string]: number };
}

export const apiResponseToStats = (
  response: ContributionsResponse
): GitHubStats => {
  const anualContributions = Object.entries(response.total).map(
    ([year, numContributions]) => ({
      year,
      numContributions,
    })
  );
  const monthContributions: { [key: string]: number } = {};
  response.contributions.forEach(({ date, count }) => {
    const dateDate = new Date(date);
    if (dateDate.getFullYear() !== CURRENT_YEAR) return;

    const month = MONTHS[dateDate.getMonth()];
    const prevNumContributions =
      month in monthContributions ? monthContributions[month] : 0;
    monthContributions[month] = prevNumContributions + count;
  });

  return { anualContributions, monthContributions };
};

interface HookResponse {
  data?: GitHubStats;
  error?: AxiosError;
}

const useGitHubStats = (): HookResponse => {
  const { data: session } = useSession();
  const { data: sessionData, error: sessionError } = useGitHubSessionData(
    session as ExtendedSession
  );
  const [stats, setStats] = useState<GitHubStats>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const username = sessionData?.username;
    if (!username) return;

    // This API call doesn't use the `useApi` hook because `username`
    // may be `undefined` in some initial renders.
    axios<ContributionsResponse>(GET_GITHUB_CONTRIBUTIONS(username))
      .then((res) => {
        const stats = apiResponseToStats(res.data);
        setStats(stats);
      })
      .catch(setError);
  }, [session, sessionData?.username]);

  return { data: stats, error: sessionError || error };
};

export default useGitHubStats;
