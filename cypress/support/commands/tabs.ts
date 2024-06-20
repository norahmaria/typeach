Cypress.Commands.add("assertTabs", (id, command, tab) => {
  if (command === "should.have.selected") {
    cy.getByRole("tablist").within(() => {
      cy.getByRole("tab")
        .filter(`#${tab}-list-item`)
        .first()
        .shouldHaveAria("selected", true);
    });
  }

  if (command === "should.not.have.selected") {
    cy.getByRole("tablist").within(() => {
      cy.getByRole("tab")
        .filter(`#${tab}-list-item`)
        .first()
        .shouldHaveAria("selected", false);
    });
  }

  if (command === "should.have.focus-on") {
    cy.getByRole("tablist").within(() => {
      cy.getByRole("tab")
        .filter(`#${tab}-list-item`)
        .first()
        .should("have.focus");
    });
  }

  if (command === "should.have.panel-open") {
    cy.getByRole("tablist").within(() => {
      cy.getByRole("tab")
        .filter(`#${tab}-list-item`)
        .first()
        .shouldHaveAria("selected", true);
    });

    cy.get(`#${tab}`).should("be.visible");
  }

  if (command === "should.have.panel-closed") {
    cy.getByRole("tablist").within(() => {
      cy.getByRole("tab")
        .filter(`#${tab}-list-item`)
        .first()
        .shouldHaveAria("selected", false);
    });

    cy.get(`#${tab}`).should("not.be.visible");
  }

  if (command === "should.have.panel-removed") {
    cy.getByRole("tablist").within(() => {
      cy.getByRole("tab")
        .filter(`#${tab}-list-item`)
        .first()
        .shouldHaveAria("selected", false);
    });

    cy.get(`#${tab}`).should("not.exist");
  }

  if (command === "should.have.panel-focused") {
    cy.get(`#${tab}`).should("be.focused");
  }
});
