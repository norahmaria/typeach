Cypress.Commands.add("assertDatePicker", (id, command, item) => {
  switch (command) {
    case "should.have.selected":
      if (!item) break;

      cy.get(`#${id}`).within(() => {
        cy.contains(`${item}`)
          .shouldHaveAria("pressed", true)
          .shouldHaveAria("current", "date");
      });

      break;

    case "should.have.focus-on":
      if (!item) break;

      cy.get(`#${id}`).within(() => {
        cy.contains(`${item}`)
          .should("have.focus")
          .should("have.attr", "tabindex", "0");
      });

      break;
  }
});
