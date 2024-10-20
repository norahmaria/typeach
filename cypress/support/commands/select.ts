 
Cypress.Commands.add("assertSelect", (id, command, item) => {
  switch (command) {
    case "should.be.open":
      cy.get(`#${id}-list`).should("be.visible");
      break;

    case "should.be.closed":
      cy.get(`#${id}-list`).should("not.be.visible");
      break;

    case "should.have.focus-on":
      if (!item) break;

      cy.get(`#${id}-list`).within(() => {
        cy.contains(item).should("have.focus");
      });

      break;

    case "should.have.selected":
      if (!item) break;

      cy.get(`#${id}-list`).within(() => {
        cy.contains(item).shouldHaveAria("selected", true);
      });

      break;

    case "should.not.have.selected":
      if (!item) break;

      cy.get(`#${id}-list`).within(() => {
        cy.contains(item).shouldHaveAria("selected", false);
      });

      break;
  }
});
