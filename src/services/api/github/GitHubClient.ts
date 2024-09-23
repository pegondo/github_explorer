import BaseClient from "../BaseClient";

const GITHUB_API_BASE_URL = "https://api.github.com/";

export type User = {
  login: string;
};

export type ContributionsResponse = {
  total: { [key: string]: number };
  contributions: {
    date: string;
    count: number;
  }[];
};

export type Releases = {
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

export type Issues = {
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

const paginateRecursive = (
  maxPageSize: number,
  length: number,
  iterations: number
): {
  pageSize: number;
  iterations: number;
} => {
  if (length <= maxPageSize) {
    return {
      pageSize: iterations === 0 ? length : maxPageSize,
      iterations: iterations + 1,
    };
  }
  return paginateRecursive(maxPageSize, length - maxPageSize, iterations + 1);
};

/**
 * Receives the maximum size of the page and the number of elements required,
 * and returns the page size and the number of iterative calls to perform to
 * the API to get the desired amount of elements.
 * @param maxPageSize - The maximum number of elements the API can return in a page.
 * @param length - The desired number of elements.
 * @return {{ pageSize: number; iterations: number }}
 */
const paginate = (
  maxPageSize: number,
  length: number
): {
  pageSize: number;
  iterations: number;
} => paginateRecursive(maxPageSize, length, 0);

class GitHubClient extends BaseClient {
  constructor() {
    super(GITHUB_API_BASE_URL);
  }

  public async getUser(accessToken: string): Promise<User> {
    // Source: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
    return super.fetch("/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async getReleases(
    repository: string,
    accessToken?: string
  ): Promise<Releases> {
    const config = accessToken
      ? {
          headers: {
            // Authenticated requests have a higher rate limit.
            // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined;

    // Source: https://docs.github.com/es/rest/releases/releases
    return super.fetch(`/repos/${repository}/releases`, config);
  }

  public async getIssues(
    repository: string,
    accessToken?: string,
    maxNumIssues: number = 30,
    state: "open" | "closed" | "all" = "all"
  ): Promise<Issues> {
    const config = accessToken
      ? {
          headers: {
            // Authenticated requests have a higher rate limit.
            // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined;

    const { iterations, pageSize } = paginate(100, maxNumIssues);
    const promises: Promise<Issues>[] = [];
    for (let page = 1; page <= iterations; page++) {
      promises.push(
        // Source: https://docs.github.com/es/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
        super.fetch<Issues>(
          `/repos/${repository}/issues?state=${state}&per_page=${pageSize}&page=${page}`,
          config
        )
      );
    }

    return Promise.all(promises).then((res) => res.flat());
  }
}

export default GitHubClient;
