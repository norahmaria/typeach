import Tooltip from "./Tooltip.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(Tooltip);

  cy.a11y();

  cy.get("button")
    .should("be.visible")
    .should("have.attr", "aria-describedby", "tooltip");

  cy.getByRole("tooltip").should("have.id", "tooltip");
});
