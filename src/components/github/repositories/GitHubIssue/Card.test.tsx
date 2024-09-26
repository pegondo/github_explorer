import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Card, { Props as CardProps } from "./Card";

describe("<Card />", () => {
  const defaultProps: CardProps = {
    title: "<title>",
    number: 1,
    body: "<body-of-the-issue>",
    state: "closed",
    url: "http://localhost:3000",
    user: {
      login: "<username>",
      url: "http://localhost:3000",
      name: "<user-name>",
    },
    assignee: {
      login: "<assignee-username>",
      url: "http://localhost:3000",
      name: "<assignee-name>",
    },
  };

  const setup = (props: CardProps = defaultProps) => {
    render(<Card {...props} />);

    const element = screen.getByTestId("github-issues-card");
    const titleHeader = screen.getByTestId("repositories-card-title-header");
    const body = screen.getByTestId("repositories-card-body");
    const url = screen.getByTestId("repositories-card-url");
    const user = screen.getByTestId("repositories-card-user");
    const assignee = screen.getByTestId("repositories-card-assignee");
    const openIcon = screen.queryByTestId("repositories-card-open-icon");
    const closedIcon = screen.queryByTestId("repositories-card-closed-icon");

    return {
      element,
      titleHeader,
      body,
      url,
      user,
      assignee,
      openIcon,
      closedIcon,
    };
  };

  it("should render", () => {
    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the title, number, body, url, user and assignee", () => {
    const { titleHeader, body, url, user, assignee } = setup();

    // Title
    expect(titleHeader.textContent).toContain(defaultProps.title);
    // Number
    expect(titleHeader.textContent).toContain(`${defaultProps.number}`);
    // Body
    expect(body.textContent).toContain(defaultProps.body);
    // URL
    expect(url.getAttribute("href")).toEqual(defaultProps.url);
    // User
    expect(user).toBeInTheDocument();
    // Username
    expect(user.textContent).toContain(defaultProps.user?.login);
    // User URL
    expect(user.getAttribute("href")).toEqual(defaultProps.user?.url);
    // Assignee
    expect(assignee).toBeInTheDocument();
    // Assignee username
    expect(assignee.textContent).toContain(defaultProps.assignee?.login);
    // Assignee URL
    expect(assignee.getAttribute("href")).toEqual(defaultProps.assignee?.url);
  });

  it("should render the right icon when the issue is open", () => {
    const { openIcon, closedIcon } = setup({ ...defaultProps, state: "open" });

    expect(openIcon).toBeInTheDocument();
    expect(closedIcon).not.toBeInTheDocument();
  });

  it("should render the right icon when the issue is closed", () => {
    const { openIcon, closedIcon } = setup({
      ...defaultProps,
      state: "closed",
    });

    expect(closedIcon).toBeInTheDocument();
    expect(openIcon).not.toBeInTheDocument();
  });
});
