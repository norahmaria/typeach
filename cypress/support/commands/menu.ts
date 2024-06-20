/* eslint-disable-next-line complexity */
Cypress.Commands.add("assertMenu", (id, command, item) => {
  switch (command) {
    case "should.be.open":
      cy.get(`#${id}`).should("not.have.css", "display", "none");
      break;

    case "should.be.closed":
      cy.get(`#${id}`).should("have.css", "display", "none");
      break;

    case "should.have.focus-on":
      if (!item) break;

      cy.get(`#${id}`).within(() => {
        cy.contains(item).should("have.focus");
      });

      break;

    case "should.have.checked":
      if (!item) break;

      cy.contains(item).shouldHaveAria("checked", true);
      break;

    case "should.not.have.checked":
      if (!item) break;

      cy.contains(item).shouldHaveAria("checked", false);
      break;
  }
});
