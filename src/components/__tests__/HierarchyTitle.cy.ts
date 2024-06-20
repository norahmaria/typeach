import HierarchyTitleTest from "./HierarchyTitle.test.vue";

it("Starts at H2", () => {
  cy.mount(HierarchyTitleTest);

  cy.get("#deeply-nested").within(() => {
    cy.get("h1").should("not.exist");
  });
});

it("Increments when nesting, and uses <p /> if level is above 6", () => {
  cy.mount(HierarchyTitleTest);

  cy.get("#deeply-nested").within(() => {
    cy.get("h2").should("have.length", 1).should("be.above", "h3");
    cy.get("h3").should("have.length", 1).should("be.above", "h4");
    cy.get("h4").should("have.length", 1).should("be.above", "h5");
    cy.get("h5").should("have.length", 1).should("be.above", "h6");
    cy.get("h6").should("have.length", 1).should("be.above", "p");
    cy.get("p").should("have.length", 1);
  });
});

it("Can manually reset level", () => {
  cy.mount(HierarchyTitleTest);

  cy.get("#manual").within(() => {
    cy.get("h4").should("have.length", 1);
    cy.get("h5").should("have.length", 1);
  });
});

it("Can inherit level from parent", () => {
  cy.mount(HierarchyTitleTest);

  cy.get("#as-parent").within(() => {
    cy.get("h4").should("have.length", 1);
  });
});
