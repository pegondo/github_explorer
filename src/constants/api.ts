export const GET_GITHUB_USER_DATA = "https://api.github.com/user";

// Source: https://github.com/grubersjoe/github-contributions-api
export const GET_GITHUB_CONTRIBUTIONS = (username: string) =>
  `https://github-contributions-api.jogruber.de/v4/${username}`;

// Source: https://docs.github.com/es/rest/releases/releases
export const GET_GITHUB_REPO_RELEASES = (repository: string) =>
  `https://api.github.com/repos/${repository}/releases`;

// Source: https://docs.github.com/es/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
export const GET_GITHUB_REPO_ISSUES = (repository: string, page: number = 1) =>
  `https://api.github.com/repos/${repository}/issues?state=all&per_page=100&page=${page}`;
