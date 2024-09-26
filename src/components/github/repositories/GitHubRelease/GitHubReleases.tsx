import Card from "./Card";

export type Props = {
  repositoryName: string;
  releases: {
    tagName: string;
    name?: string;
    body?: string;
    url: string;
    tarballUrl?: string;
    isDraft: boolean;
    isPrerelease: boolean;
    author: {
      name?: string;
      url: string;
    };
  }[];
};

const GitHubReleases = ({ repositoryName, releases }: Props) => (
  <div data-testid="github-releases">
    <h2 className="text-xl pb-2" data-testid="github-releases-header">
      <strong>Releases</strong> of {repositoryName}
    </h2>
    <p className="text-s pb-3" data-testid="github-releases-counter">
      {repositoryName} has {releases.length} releases
    </p>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {releases.map(
        (
          {
            tagName,
            name,
            body,
            url,
            tarballUrl,
            isDraft,
            isPrerelease,
            author: { name: authorName, url: authorUrl },
          },
          index
        ) => (
          <div key={`release-${index}`} className="flex">
            <Card
              tagName={tagName}
              name={name}
              body={body}
              url={url}
              tarballUrl={tarballUrl}
              isDraft={isDraft}
              isPrerelease={isPrerelease}
              author={{ name: authorName, url: authorUrl }}
            />
          </div>
        )
      )}
    </div>
  </div>
);

export default GitHubReleases;
