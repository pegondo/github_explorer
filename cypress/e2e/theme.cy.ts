describe("The Theming", () => {
  it("should change to dark theme when clicking the theme button", () => {
    // Navigate to `/`.
    cy.visit("/");

    // Verify that we are using the light theme.
    cy.get('[data-testid="home"]').should("have.css", "color-scheme", "light");

    // Press the button to change the theme.
    cy.get('[data-testid="change-theme"]').click();

    // Verify that we are using the dark theme.
    cy.get('[data-testid="home"]').should("have.css", "color-scheme", "dark");
  });
});
