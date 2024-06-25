import Tree from "./Tree.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(Tree);

  cy.contains("Projects")
    .parent()
    .parent()
    .shouldHaveRole("tree")
    .shouldHaveAria("multiselectable", false);

  cy.contains("Projects").parent().shouldHaveRole("treeitem").focus();

  cy.realPress("ArrowRight");

  ["Project 1", "Project 2", "Project 3", "Project 4"].forEach((title, i) => {
    cy.contains(title).parent().shouldHaveRole("treeitem").shouldHaveArias({
      setsize: 4,
      level: 2,
    });
  });
});

it("Should be able to open on label click", () => {
  cy.mount(Tree);

  cy.contains("Project").realClick();

  cy.contains("Projects").parent().shouldHaveAria("expanded", true);

  ["Project 1", "Project 2", "Project 3", "Project 4"].forEach((title, i) => {
    cy.contains(title).should("exist");
  });
});

it("Focuses item on label hover", () => {
  cy.mount(Tree);

  cy.contains("Project").realHover();

  cy.contains("Project").parent().should("have.focus");
});

it("Keyboard tabbing works as normal", () => {
  cy.mount(Tree);
  cy.contains("prefix").focus();

  cy.realPress("Tab");
  cy.contains("Projects").parent().should("have.focus");

  cy.realPress("Tab");
  cy.contains("suffix").should("have.focus");
});

describe("Keyboard navigation", () => {
  beforeEach(() => {
    cy.mount(Tree);
    cy.contains("Projects").parent().focus();
  });

  it("Can navigate and open and close branches with {ArrowRight} and {ArrowLeft}", () => {
    cy.realPress("ArrowRight");

    cy.contains("Projects").parent().shouldHaveAria("expanded", true);

    ["Project 1", "Project 2", "Project 3", "Project 4"].forEach((title, i) => {
      cy.contains(title).should("exist");
    });

    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");

    cy.contains("Project 3").parent().shouldHaveAria("expanded", true);

    ["Subproject 1", "Subproject 2"].forEach((title, i) => {
      cy.contains(title).should("exist");
    });

    cy.realPress("ArrowLeft");
    cy.realPress("ArrowLeft");

    cy.contains("Project 3").parent().shouldHaveAria("expanded", false);

    ["Subproject 1", "Subproject 2"].forEach((title, i) => {
      cy.contains(title).should("not.exist");
    });
  });

  it("Can navigate to first and last item with {Home} and {End}", () => {
    cy.realPress("ArrowRight");

    cy.contains("Projects").parent().shouldHaveAria("expanded", true);

    ["Project 1", "Project 2", "Project 3", "Project 4"].forEach((title, i) => {
      cy.contains(title).should("exist");
    });

    cy.realPress("Home");
    cy.contains("Projects").parent().should("have.focus");

    cy.realPress("End");
    cy.contains("Letters").parent().should("have.focus");

    cy.realPress("ArrowRight");

    cy.realPress("ArrowRight");
    cy.realPress("Home");
    cy.contains("Projects").parent().should("have.focus");

    cy.realPress("End");
    cy.contains("Letter 2").parent().should("have.focus");
  });

  it("Can search with {Character}", () => {
    cy.realPress("L");
    cy.realPress("ArrowRight");

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(500);

    cy.realPress("P");
    cy.contains("Projects").parent().should("have.focus");

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(500);

    cy.realPress("L");
    cy.realPress("L");
    cy.realPress("L");
    cy.contains("Letter 2").parent().should("have.focus");
  });

  it("Can navigate with {ArrowUp} and {ArrowDown}", () => {
    cy.realPress("ArrowRight");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.contains("Project 3").parent().should("have.focus");

    cy.realPress("ArrowRight");
    cy.realPress("ArrowDown");
    cy.contains("Subproject 1").parent().should("have.focus");

    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.contains("Project 4").parent().should("have.focus");

    cy.realPress("ArrowDown");
    cy.contains("Machine").parent().should("have.focus");

    cy.realPress("ArrowDown");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowDown");
    cy.contains("Letter 1").parent().should("have.focus");

    cy.realPress("ArrowDown");
    cy.contains("Letter 2").parent().should("have.focus");
  });

  it("Can expand all siblings with {*}", () => {
    cy.realPress("*");

    cy.contains("Projects").parent().shouldHaveAria("expanded", true);

    ["Project 1", "Project 2", "Project 3", "Project 4"].forEach((title, i) => {
      cy.contains(title).should("exist");
    });

    cy.contains("Letters").parent().shouldHaveAria("expanded", true);

    ["Letter 1", "Letter 2"].forEach((title, i) => {
      cy.contains(title).should("exist");
    });

    cy.realPress("Home");
    cy.realPress("ArrowLeft");

    cy.contains("Letters").parent().focus();
    cy.realPress("ArrowLeft");

    cy.realPress("Home");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("*");

    cy.contains("Project 3").parent().shouldHaveAria("expanded", true);

    ["Subproject 1", "Subproject 2"].forEach(title => {
      cy.contains(title).should("exist");
    });
  });
});

it("Emits toggle event on {Enter} or {Space}", () => {
  cy.mount(Tree, {
    props: {
      onToggle: cy.spy().as("toggle"),
    },
  });

  cy.contains("Projects").parent().focus();

  cy.realPress("ArrowRight");
  cy.realPress("ArrowRight");
  cy.realPress("Enter");

  cy.realPress("ArrowDown");
  cy.realPress("ArrowDown");
  cy.realPress("Space");

  cy.get("@toggle").should("have.been.calledWith", "project-1");
  cy.get("@toggle").should("have.been.calledWith", "project-3");
});
