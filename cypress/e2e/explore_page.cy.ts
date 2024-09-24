// TODO: Remove this and fix the console.errors.
Cypress.on("uncaught:exception", () => false);

describe("The Explore page", () => {
  it("should load successfully if the user is logged in", () => {
    cy.login();
    cy.visit("explore");
  });

  it("should load successfully if the user isn't logged in", () => {
    cy.visit("explore");
  });

  it("should show some releases", () => {
    // Log in to use the user access token and have higher rate limits.
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    cy.login();
    cy.visit("explore");

    cy.get('[data-testid="github-releases-card"]')
      .its("length")
      .should("be.greaterThan", 1);
  });

  it("should show at least 1000 issues", () => {
    // Log in to use the user access token and have higher rate limits.
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
    cy.login();
    cy.visit("explore");

    cy.get('[data-testid="github-issues-card"]')
      .its("length")
      .should("be.greaterThan", 999);
  });
});
