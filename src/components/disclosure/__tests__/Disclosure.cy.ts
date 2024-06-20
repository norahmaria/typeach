import DisclosureTest from "./Disclosure.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(DisclosureTest);

  cy.a11y();

  cy.get("#trigger")
    .shouldHaveAria("expanded", "false")
    .shouldHaveAria("controls", "target")
    .realClick();

  cy.getByRole("region")
    .should("be.visible")
    .should("have.id", "target")
    .shouldHaveAria("labelledby", "trigger");
});

describe("Can open and close", () => {
  beforeEach(() => {
    cy.mount(DisclosureTest);
  });

  it("Opens and closes on click", () => {
    cy.get("#trigger").shouldHaveAria("expanded", "false").realClick();

    cy.getByRole("region").should("be.visible");

    cy.get("#trigger").shouldHaveAria("expanded", "true").realClick();

    cy.getByRole("region").should("not.exist");
  });

  it("Opens and closes on touch", () => {
    cy.get("#trigger").shouldHaveAria("expanded", "false").realTouch();

    cy.getByRole("region").should("be.visible");

    cy.get("#trigger").shouldHaveAria("expanded", "true").realTouch();

    cy.getByRole("region").should("not.exist");
  });

  it("Opens and closes on {Enter} or {Space}", () => {
    cy.get("#trigger").shouldHaveAria("expanded", "false").focus();
    cy.realPress("Enter");

    cy.getByRole("region").should("be.visible");

    cy.get("#trigger").shouldHaveAria("expanded", "true").focus();
    cy.realPress("Space");

    cy.get("#trigger").shouldHaveAria("expanded", "false");
    cy.getByRole("region").should("not.exist");
  });
});
