import GitHubReleases from "@/components/github/repositories/GitHubRelease/GitHubReleases";
import { getServerSession } from "next-auth";
import { ExtendedSession, options } from "../api/auth/[...nextauth]/options";
import GitHubIssues from "@/components/github/repositories/GitHubIssue/GitHubIssues";
import GitHubClient, {
  Issues,
  Releases,
} from "@/services/api/github/GitHubClient";
import { getRandomRepositoryOfTheDay } from "@/services/github/repositories";

// TODO: Show a loading screen in the mean time.

const gitHubClient = new GitHubClient();

const Error = () => (
  <p data-testid="github-client-error">
    Could not get the repository of the day, please, try later.
  </p>
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
    releases = await gitHubClient.getReleases(repository, accessToken);
  } catch (err) {
    console.error(err);
    return <Error />;
  }

  // Fetch the issues of the repository of the day.
  let issues: Issues;
  try {
    issues = await gitHubClient.getIssues(repository, accessToken, 1000);
  } catch (err) {
    console.error(err);
    return <Error />;
  }

  return (
    <div className="p-4" data-testid="explore-page">
      <h1 className="text-2xl pb-4" data-testid="repo-otd-header">
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
