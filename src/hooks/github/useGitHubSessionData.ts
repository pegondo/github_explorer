import { useEffect, useState } from "react";
import { ExtendedSession } from "@/app/api/auth/[...nextauth]/options";
import { AxiosError } from "axios";
import GitHubClient from "@/services/api/github/GitHubClient";

interface SessionData {
  username: string;
}

interface HookResponse {
  data?: SessionData;
  error?: AxiosError;
}

const gitHubClient = new GitHubClient();

/**
 * Returns some additional GitHub session data from the given session.
 * @param session - The session to get the data from.
 * @returns {HookResponse} - The session data or an axios error.
 */
const useGitHubSessionData = (session: ExtendedSession): HookResponse => {
  const [data, setData] = useState<SessionData>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (!accessToken) return;

    // This API call doesn't use the `useApi` hook because `accessToken` may be
    // `undefined` in some initial renders.
    gitHubClient
      .getUser(accessToken)
      .then((res) => {
        setData({
          username: res.login,
        });
      })
      .catch(setError);
  }, [session?.accessToken]);

  return { data, error };
};

export default useGitHubSessionData;
