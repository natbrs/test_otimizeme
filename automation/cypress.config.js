const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'fkhmvu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/tests/**/*.cy.js',
    video: true,
  },
});