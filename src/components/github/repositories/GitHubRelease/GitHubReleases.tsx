import Card from "./Card";

type Props = {
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
  <div>
    <h2 className="text-xl pb-2">
      <strong>Releases</strong> of {repositoryName}
    </h2>
    <p className="text-s pb-3">
      {repositoryName} has {releases.length} releases
    </p>
    <div className="grid grid-cols-4 gap-4">
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
