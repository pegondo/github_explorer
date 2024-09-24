// TODO: Remove this and fix the console.errors.
Cypress.on("uncaught:exception", () => false);

describe("The Profile page", () => {
  it("should load successfully if the user is logged in", () => {
    cy.login();
    cy.visit("/profile");
  });

  it("should redirect to /sign-in if the user isn't logged in", () => {
    cy.visit("/profile");

    cy.location("pathname").should("eq", "/sign-in");
  });

  it("should display the user data if the user is logged in", () => {
    cy.login();
    cy.visit("/profile");

    cy.get('[data-testid="username"]').should("exist");
    cy.get('[data-testid="user-image"]').should("exist");
  });

  it("should display the user interactions charts if the user is logged in", () => {
    cy.login();
    cy.visit("/profile");

    cy.get('[data-testid="year-interactions-chart"]').should("exist");
    cy.get('[data-testid="month-interactions-chart"]').should("exist");
  });
});
