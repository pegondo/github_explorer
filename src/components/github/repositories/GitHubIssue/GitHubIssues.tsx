import Card from "./Card";

export type Props = {
  repositoryName: string;
  issues: {
    title: string;
    number: number;
    body?: string;
    url: string;
    state: "open" | "closed";
    stateReason?: "completed" | "reopened" | "not_planned";
    user?: {
      name?: string;
      login: string;
      url: string;
    };
    assignee?: {
      name?: string;
      login: string;
      url: string;
    };
  }[];
};

const formatIssuesLength = (length: number): string =>
  length <= 999 ? `${length}` : "+999";

const GitHubIssues = ({ repositoryName, issues }: Props) => (
  <div data-testid="github-issues">
    <h2 className="text-xl pb-2" data-testid="github-issues-header">
      <strong>Issues</strong> of {repositoryName}
    </h2>
    <p className="text-s pb-3" data-testid="github-issues-counter">
      {repositoryName} has {formatIssuesLength(issues.length)} issues
    </p>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {issues.map(
        (
          { title, number, body, url, state, stateReason, user, assignee },
          index
        ) => (
          <div key={`issue-${index}`} className="flex">
            <Card
              title={title}
              number={number}
              body={body}
              url={url}
              state={state}
              stateReason={stateReason}
              user={user}
              assignee={assignee}
            />
          </div>
        )
      )}
    </div>
  </div>
);

export default GitHubIssues;
