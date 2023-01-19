# Monstercat Frontend Take-home Test

This is a small SPA to meet the Monstercat assessment requirements. Displays data from the Pokémon API and sends a post request to Monstercat's test API.

## Getting started
The repo uses Vite 4.0.4 for its tooling. **Vite requires Node.js version 14.18+, 16+**.

Clone the repo to local. Once downloaded, use `npm install` or `yarn install` to install dependencies. Once installed, use the commands below to run locally or `npx cypress open` to run the tests.

### Available commands 

#### using NPM

- `npm run dev`: spin up a dev server at http://localhost:5173/
- `npm run build`: creates a ready-to-use build in `./dist`
- `npm run preview`: spin up local server using build files

#### using Yarn

- `yarn dev`: spin up a dev server at http://localhost:5173/
- `yarn build`: creates a ready-to-use build in `./dist`
- `yarn preview`: spin up local server using build files

## Testing
This repo uses Cypress for testing. Each component has its own spec. A simple E2E test is also available. To run the test suite, use `npx cypress open`. Make sure to run `yarn dev` in another terminal before running the E2E test.

**Note: Cypress will warn that it does not officially support Vite ^4.0.0. This doesn't look to be an issue as all tests run successfully**.

## Dev notes
I chose to keep this project as simple as possible using tools I'm comfortable with. I went with Vite as opposed to Create React App (CRA) as I've found it to generally be faster and lighter than CRA. It's got built-in support for SASS and the project structure is exactly how I want it so set up time was minimal. 

I was originally going to use Redux/Redux ToolKit as RTK Query is really powerful for interacting with APIs, but chose not to as there were only 3 endpoints I needed to interact with. Ultimately, it was faster to write a simple general `useApi` hook to handle the query logic.

SASS was used over CSS or CSS-in-JSS mostly because I'm used to it and I tend to write styles that roughly follow BEM principles. Using SASS helps speed up the styling process and keeps it easy to read. 