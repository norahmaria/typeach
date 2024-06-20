/// <reference types="cypress" />
/// <reference types="./index" />

import "./commands/date-picker";
import "./commands/select";
import "./commands/menu";
import "./commands/tabs";

Cypress.Commands.add("getByRole", (role: string) => {
  return cy.get(`[role="${role}"]`);
});

Cypress.Commands.add("getByAria", (property, value) => {
  return cy.get(`[aria-${property}="${value}"]`);
});

Cypress.Commands.add("getByArias", properties => {
  const arias = Object.entries(properties)
    .map(([property, value]) => `[aria-${property}="${value}"]`)
    .join("");

  return cy.get(arias);
});

/* prettier-ignore */
Cypress.Commands.add("shouldHaveArias", { prevSubject: ["element"] }, (element, properties) => {
  for (const [property, value] of Object.entries(properties)) {
    cy.wrap(element).should("have.attr", `aria-${property}`, `${value}`);
  }

  return cy.wrap(element);
});

/* prettier-ignore */
Cypress.Commands.add("shouldHaveAria", { prevSubject: ["element"] }, (element, property, value) => {
  return cy.wrap(element).should("have.attr", `aria-${property}`, `${value}`);
});

/* prettier-ignore */
Cypress.Commands.add("shouldHaveRole", { prevSubject: ["element"] }, (element, role) => {
  return cy.wrap(element).should("have.attr", "role", role);
});

Cypress.Commands.add("a11y", () => {
  cy.injectAxe();

  cy.checkA11y("[data-cy-root]", {}, errors => {
    errors.forEach(error => {
      console.error(error);
    });
  });
});

export {};
