import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 750,
  viewportWidth: 1200,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
