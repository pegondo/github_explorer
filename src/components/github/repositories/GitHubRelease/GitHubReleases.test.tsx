import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import GitHubReleases, { Props as GitHubReleasesProps } from "./GitHubReleases";

describe("<GitHubReleases />", () => {
  const defaultProps: GitHubReleasesProps = {
    repositoryName: "<repository>",
    releases: [
      {
        tagName: "<tag-1>",
        name: "<name-1>",
        body: "<body-1>",
        url: "http://localhost:3000",
        tarballUrl: "http://localhost:3000",
        isDraft: true,
        isPrerelease: true,
        author: {
          name: "<author-name-1>",
          url: "http://localhost:3000",
        },
      },
      {
        tagName: "<tag-2>",
        name: "<name-2>",
        body: "<body-2>",
        url: "http://localhost:3000",
        tarballUrl: "http://localhost:3000",
        isDraft: true,
        isPrerelease: true,
        author: {
          name: "<author-name-2>",
          url: "http://localhost:3000",
        },
      },
    ],
  };
  const setup = (props: GitHubReleasesProps = defaultProps) => {
    render(<GitHubReleases {...props} />);

    const element = screen.getByTestId("github-releases");
    const header = screen.getByTestId("github-releases-header");
    const counter = screen.getByTestId("github-releases-counter");
    const cards = screen.getAllByTestId("github-releases-card");

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

  it("should contain the number of releases in the counter", () => {
    const { counter } = setup();

    expect(counter.textContent).toContain(`${defaultProps.releases.length}`);
  });

  it("should show as many cards as releases provided", () => {
    const { cards } = setup();

    expect(cards.length).toEqual(defaultProps.releases.length);
  });
});
