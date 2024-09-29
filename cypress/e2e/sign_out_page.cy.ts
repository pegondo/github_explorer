describe("The Sign Out page", () => {
  it("should load successfully", () => {
    cy.visit("/sign-in");
  });

  it("should redirect to / if the user isn't logged in", () => {
    cy.visit("/sign-out");

    cy.location("pathname").should("eq", "/");
  });

  it("should allow a logged in user to log out", () => {
    cy.login();

    // Wait for 1 second for the application to fully load the onClick
    // callback of the sign out button. Otherwise, cypress may click
    // the button before its callback is loaded, failing the test.
    // Using wait isn't a best practice, but after research, that's the
    // only solution I found.
    cy.visit("/sign-out").wait(1000);

    cy.get('[data-testid="sign-out"]').click();

    // The URL should be `/`.
    cy.url().should("eq", "http://localhost:3000/");
    // The OAuth cookie shouldn't be defined.
    cy.getCookie("next-auth.session-token").should("not.exist");
  });
});
