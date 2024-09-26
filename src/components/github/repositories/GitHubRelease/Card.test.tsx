import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Card, { Props as CardProps } from "./Card";

describe("<Card />", () => {
  const defaultProps: CardProps = {
    tagName: "<tag>",
    name: "<name>",
    body: "<body>",
    url: "http://localhost:3000",
    tarballUrl: "http://localhost:3000",
    isDraft: true,
    isPrerelease: true,
    author: {
      name: "<author-name>",
      url: "http://localhost:3000",
    },
  };
  const setup = (props: CardProps = defaultProps) => {
    render(<Card {...props} />);

    const element = screen.getByTestId("github-releases-card");
    const tag = screen.getByTestId("github-releases-card-tag");
    const name = screen.getByTestId("github-releases-card-name");
    const body = screen.getByTestId("github-releases-card-body");
    const url = screen.getByTestId("github-releases-card-url");
    const tarballUrl = screen.getByTestId("github-releases-card-tarball-url");
    const author = screen.getByTestId("github-releases-card-author");
    const draftIcon = screen.queryByTestId(
      "github-releases-card-is-draft-icon"
    );
    const preReleaseIcon = screen.queryByTestId(
      "github-releases-card-is-pre-release-icon"
    );

    return {
      element,
      tag,
      name,
      body,
      url,
      tarballUrl,
      draftIcon,
      preReleaseIcon,
      author,
    };
  };

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the tag, name, body, url, tarball url and author", () => {
    const { tag, name, body, url, tarballUrl, author } = setup();

    // Tag
    expect(tag.textContent).toContain(defaultProps.tagName);
    // Name
    expect(name.textContent).toContain(defaultProps.name);
    // Body
    expect(body.textContent).toContain(defaultProps.body);
    // URL
    expect(url.getAttribute("href")).toEqual(defaultProps.url);
    // Tarball url
    expect(tarballUrl.getAttribute("href")).toEqual(defaultProps.tarballUrl);
    // Author
    expect(author).toBeInTheDocument();
    // Author url
    expect(author.getAttribute("href")).toEqual(defaultProps.author.url);
    // Author name
    expect(author.textContent).toContain(defaultProps.author.name);
  });

  it("should render the right icon when it's a draft", () => {
    const { draftIcon } = setup({ ...defaultProps, isDraft: true });

    expect(draftIcon).toBeInTheDocument();
  });

  it("shoulr render the right icon when it's a pre release", () => {
    const { preReleaseIcon } = setup({ ...defaultProps, isPrerelease: true });

    expect(preReleaseIcon).toBeInTheDocument();
  });
});
