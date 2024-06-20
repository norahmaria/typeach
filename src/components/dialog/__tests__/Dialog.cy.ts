import Dialog from "./Dialog.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(Dialog);
  cy.a11y();

  cy.get("#target").should("not.be.visible");

  cy.get("#trigger")
    .shouldHaveAria("haspopup", "dialog")
    .shouldHaveAria("controls", "target")
    .realClick();

  cy.get("#target")
    .shouldHaveAria("labelledby", "title")
    .shouldHaveAria("describedby", "description");

  cy.get("#target").should("be.visible");
});
