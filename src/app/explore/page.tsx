import GitHubReleases from "@/components/github/repositories/GitHubRelease/GitHubReleases";
import { RANDOM_REPOSITORIES } from "@/constants";
import axios from "axios";
import { getServerSession } from "next-auth";
import { ExtendedSession, options } from "../api/auth/[...nextauth]/options";
import GitHubIssues from "@/components/github/repositories/GitHubIssue/GitHubIssues";
import { GET_GITHUB_REPO_ISSUES, GET_GITHUB_REPO_RELEASES } from "@/constants";

// TODO: Show a loading screen in the mean time.

type Releases = {
  tag_name: string;
  name?: string;
  body?: string;
  html_url: string;
  tarball_url?: string;
  draft: boolean;
  prerelease: boolean;
  author: {
    name?: string;
    html_url: string;
  };
}[];

type Issues = {
  title: string;
  number: number;
  body?: string;
  html_url: string;
  state: "open" | "closed";
  state_reason?: "completed" | "reopened" | "not_planned";
  user?: {
    name?: string;
    login: string;
    html_url: string;
  };
  assignee?: {
    name?: string;
    login: string;
    html_url: string;
  };
}[];

const getRandomRepositoryOfTheDay = () => {
  const today = new Date();
  const day = today.getDate();
  return RANDOM_REPOSITORIES[day % RANDOM_REPOSITORIES.length];
};

const Error = () => (
  <p>Could not get the repository of the day, please, try later.</p>
);

const ExplorePage = async () => {
  // This page is public, but if the user is logged in we can use its access token to
  // perform requests to the GitHub API with higher rate limits.
  const session = await getServerSession(options);
  const repository = getRandomRepositoryOfTheDay();

  const accessToken = (session as ExtendedSession)?.accessToken;

  // Fetch the releases of the repository of the day.
  let releases: Releases;
  try {
    const config = accessToken
      ? {
          headers: {
            // Authenticated requests have a higher rate limit.
            // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined;
    const releasesResponse = await axios<Releases>(
      GET_GITHUB_REPO_RELEASES(repository),
      config
    );
    releases = releasesResponse.data;
  } catch (err) {
    console.error(err);
    return <Error />;
  }

  // Fetch the issues of the repository of the day.
  const issues: Issues = [];
  try {
    // Ask for the first 10 pages of issues.
    // 10 pages x 100 elements per page = 1000 elements.
    for (let i = 0; i < 10; i++) {
      const config = accessToken
        ? {
            headers: {
              // Authenticated requests have a higher rate limit.
              // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : undefined;
      const releasesResponse = await axios<Issues>(
        GET_GITHUB_REPO_ISSUES(repository, i + 1),
        config
      );
      issues.push(...releasesResponse.data);
    }
  } catch (err) {
    console.error(err);
    return <Error />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl pb-4">
        The random repository of the day is{" "}
        <a
          href={`https://github.com/${repository}`}
          target="_blank"
          className="underline text-blue-600"
        >
          <strong>{repository}</strong>
        </a>
      </h1>
      <GitHubReleases
        repositoryName={repository}
        releases={releases.map(
          ({
            tag_name,
            name,
            body,
            html_url,
            tarball_url,
            draft,
            prerelease,
            author: { name: authorName, html_url: authorUrl },
          }) => ({
            tagName: tag_name,
            name,
            body,
            url: html_url,
            tarballUrl: tarball_url,
            isDraft: draft,
            isPrerelease: prerelease,
            author: {
              name: authorName,
              url: authorUrl,
            },
          })
        )}
      />
      <br />
      <GitHubIssues
        repositoryName={repository}
        issues={issues.map(
          ({
            title,
            number,
            body,
            html_url,
            state,
            state_reason,
            user,
            assignee,
          }) => ({
            title,
            number,
            body,
            url: html_url,
            state,
            stateReason: state_reason,
            user: user
              ? {
                  name: user?.name,
                  login: user.login,
                  url: user?.html_url,
                }
              : undefined,
            assignee: assignee
              ? {
                  name: assignee?.name,
                  login: assignee?.login,
                  url: assignee?.html_url,
                }
              : undefined,
          })
        )}
      />
    </div>
  );
};

export default ExplorePage;
