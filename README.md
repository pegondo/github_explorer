# GitHub explorer

GitHub explorer is a GitHub-OAuth based dashboard for viewing popular public repository information and user analytics of your own.

## Getting Started

### Visit TODO: Add link

You can visit the fully deployed application at TODO: Add link.

### Run locally

If you prefer to run the project locally to contribute to it or just take a look, you can also do so.

First, install the dependencies:

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
