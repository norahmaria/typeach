import "./commands";

import "cypress-real-events";
import "cypress-layout-inspector/add-support";
import "cypress-slow-down/commands";

import "cypress-axe";

import { slowCypressDown } from "cypress-slow-down";

import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

slowCypressDown(false, false);

Cypress.Commands.add("mount", mount);

afterEach(() => {
  /**
   * Reset realHover state after every test
   * to avoid tests interfering with each other.
   *
   * @see https://github.com/dmtrKovalenko/cypress-real-events#2-when-i-am-doing-cyrealhover-hovering-state-is-not-resetting-after-my-checks
   */
  cy.get("[data-cy-root]").parent().realHover({
    position: "topLeft",
  });
});
