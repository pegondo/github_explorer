import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import GitHubIssues, { Props as GitHubIssuesProps } from "./GitHubIssues";

describe("<GitHubIssues />", () => {
  const defaultProps: GitHubIssuesProps = {
    repositoryName: "<repository-name>",
    issues: [
      {
        title: "<title-1>",
        number: 1,
        body: "<body-of-the-issue-1>",
        state: "closed",
        url: "http://localhost:3000",
        user: {
          login: "<username-1>",
          url: "http://localhost:3000",
          name: "<user-name-1>",
        },
        assignee: {
          login: "<assignee-username-1>",
          url: "http://localhost:3000",
          name: "<assignee-name-1>",
        },
      },
      {
        title: "<title-2>",
        number: 1,
        body: "<body-of-the-issue-2>",
        state: "closed",
        url: "http://localhost:3000",
        user: {
          login: "<username-2>",
          url: "http://localhost:3000",
          name: "<user-name-2>",
        },
        assignee: {
          login: "<assignee-username-2>",
          url: "http://localhost:3000",
          name: "<assignee-name-2>",
        },
      },
    ],
  };
  const setup = (props: GitHubIssuesProps = defaultProps) => {
    render(<GitHubIssues {...props} />);

    const element = screen.getByTestId("github-issues");
    const header = screen.getByTestId("github-issues-header");
    const counter = screen.getByTestId("github-issues-counter");
    const cards = screen.getAllByTestId("github-issues-card");

    return { element, header, counter, cards };
  };

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should contain the repository name in the header", () => {
    const { header } = setup();

    expect(header.textContent).toContain(defaultProps.repositoryName);
  });

  it("should contain the number of issues in the counter", () => {
    const { counter } = setup();

    expect(counter.textContent).toContain(`${defaultProps.issues.length}`);
  });

  it("should show as many cards as issues provided", () => {
    const { cards } = setup();

    expect(cards.length).toEqual(defaultProps.issues.length);
  });
});
