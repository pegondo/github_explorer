const USERNAME = Cypress.env("username");
const PASSWORD = Cypress.env("password");

Cypress.on("uncaught:exception", (err) => {
  // Cypress throws a NEXT_REDIRECT exception when a redirection is
  // performed.
  // This happens in session redirections, so this piece of code
  // ignores it.
  return !err.message.includes("NEXT_REDIRECT");
});

Cypress.Commands.add(
  "login",
  (username: string = USERNAME, password: string = PASSWORD) => {
    cy.session(
      username,
      () => {
        // Go to the sign in page.

        // Wait for 1 second for the application to fully load the onClick
        // callback of the sign out button. Otherwise, cypress may click
        // the button before its callback is loaded, failing the test.
        // Using wait isn't a best practice, but after research, that's the
        // only solution I found.
        cy.visit("/sign-in").wait(1000);

        cy.get("[data-testid='sign-in']").trigger("click");

        cy.origin(
          "https://github.com",
          { args: { username, password } },
          ({ username, password }) => {
            // Log in using a GitHub account.
            cy.get('input[name="login"]').type(username);
            cy.get('input[name="password"]').type(`${password}{enter}`);

            // The first time you log in to an OAuth application you are asked to
            // authorize the application to access your data. The following code will
            // accept the authorization if shown.
            cy.get("body").then(($body) => {
              if (
                $body.find('button[name="authorize"][value="1"]').length > 0
              ) {
                cy.get('button[name="authorize"][value="1"]').click();
              }
            });
          }
        );
      },
      {
        validate: () => {
          cy.getCookie("next-auth.session-token").should("exist");
        },
      }
    );
  }
);
