// TODO: Remove this and fix the console.errors.
Cypress.on("uncaught:exception", () => false);

describe("The Home page", () => {
  it("should load successfully", () => {
    cy.visit("/");
  });

  it("should navigate to the sign in page when the sign in button is clicked and the user isn't signed in", () => {
    cy.visit("/");

    cy.get('[data-testid="home-sign-in-button"]').click();

    cy.location("pathname").should("eq", "/sign-in");
  });

  it("should navigate to the profile page when the profile button is clicked and the user is logged in", () => {
    cy.login();
    cy.visit("/");

    cy.get('[data-testid="home-profile-button"]').click();

    cy.location("pathname").should("eq", "/profile");
  });

  it("should navigate to the explore page when the explore button is clicked", () => {
    cy.visit("/");

    cy.get('[data-testid="home-explore-button"]').click();

    cy.location("pathname").should("eq", "/explore");
  });
});
