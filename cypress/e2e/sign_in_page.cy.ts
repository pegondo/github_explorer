describe("The Sign In page", () => {
  it("should load successfully", () => {
    cy.visit("/sign-in");
  });

  it("should allow the user to log in", () => {
    cy.login();
  });

  it("should redirect to /profile if the user is already logged in", () => {
    cy.login();

    cy.visit("/sign-in");

    cy.location("pathname").should("eq", "/profile");
  });
});
