# GitHub explorer

GitHub explorer is a GitHub-OAuth based dashboard for viewing popular public repository information and user analytics of your own.

## Getting Started

### Visit https://github-explorer-five-ivory.vercel.app/

You can visit the fully deployed application at https://github-explorer-five-ivory.vercel.app/

### Run locally

If you prefer to run the project locally to contribute to it or just take a look, you can also do so.

First, set up the environment variables. You have to set up the following environment variables in your `.env` or `.env.local` file. Here is a list with a description for every variable needed:

- `NEXTAUTH_SECRET` is the secret [the NextAuth library](https://next-auth.js.org/) uses to manage the authentication. Is is used to encrypt the JWT, hash emails... More information in [here](https://next-auth.js.org/configuration/options#nextauth_secret). You can generate one by running `npx auth secret` in the root of this project.
- `GITHUB_SECRET` is the OAuth secret GitHub requires as an OAuth provider. More information [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps). You can generate one in [here](https://github.com/settings/applications/new).
- `GITHUB_ID` is the OAuth application ID GitHub requires as an OAuth provider. More information [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps). You can generate one in [here](https://github.com/settings/applications/new).

Then, install the dependencies:

```bash
npm i
```

Then, you can run the application in dev mode:

```bash
npm run dev
```

Or you can build it and serve it:

```bash
npm run build
npm run start
```

And access [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## User manual

You can access the user manual in [/docs/user_manual](/docs/user_manual.md).

## Tests

This application has unit and end-to-end tests.

### Unit tests

You can run the unit tests with

```bash
npm run test
```

### End-to-end tests

To run the unit tests, you have to first run the application. You can do it with:

```bash
npm run dev
```

**Note**: it is recommended by cypress to run your e2e tests using the dev mode. More info [here](https://docs.cypress.io/guides/getting-started/opening-the-app).

Then, you can run the cypress client with:

```bash
npm run cy:open
```

Or run the e2e tests using Chrome with:

```bash
npm run e2e:chrome
```

## Architecture

The application is structured following the standards for `app` Next.js architectures.

Here is a more detailed description of the folders structure:

```bash
root
├───cypress # Contains the tests
├───docs # Contains the docs
├───mock # Contains the test mocks
├───public # Contains the assets used in the ap
└───src # Contains the code for the app components
    ├───app # Contains the code for the pages
    │   ├───api
    │   │   └───auth # Contains the OAuth components
    │   ├───explore # The explore page
    │   ├───profile # The profile page
    │   ├───sign-in # The sign in page
    │   ├───sign-out # The sign out page
    │   └───styles # The style-related components and CSS
    ├───components # The components
    │   ├───auth # The OAuth components
    │   ├───button # A button from the UI kit
    │   ├───github # The GitHub-related components
    │   ├───graph # The d3 graphs-related components
    │   ├───home # The home components
    │   ├───loading # The loading component from the UI kit
    │   ├───navigation # The navigation components
    │   └───theme # The theming components
    ├───constants # The code constants
    ├───hooks # The hooks
    └───services # The services utils
```
