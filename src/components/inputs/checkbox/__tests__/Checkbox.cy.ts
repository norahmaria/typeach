import Checkbox from "./Checkbox.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(Checkbox);
  cy.a11y();
});

describe("Can toggle tri-state", () => {
  beforeEach(() => {
    cy.mount(Checkbox);
  });

  it("🔄 ", () => {
    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("not.be.checked");
    });
  });

  it("✅ All subitems of a parent", () => {
    cy.get("#clementines").realClick();
    cy.get("#oranges").realClick();

    ["clementines", "oranges", "citrus"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples", "lemons"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });

  it("✅ → Parent ❌ → All 🔄", () => {
    cy.get("#all").realClick();
    cy.get("#juicy").realClick();

    ["pears", "apples"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["juicy", "lemons", "citrus", "clementines", "oranges"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("not.be.checked");
    });

    cy.get("#all").realClick();

    ["pears", "apples"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["juicy", "lemons", "citrus", "clementines", "oranges"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });

  it("✅ → Item ❌ → All 🔄", () => {
    cy.get("#all").realClick();
    cy.get("#oranges").realClick();

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("not.be.checked");
    });

    cy.get("#all").realClick();

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });

  it("✅ → Item ❌ → Parent 🔄", () => {
    cy.get("#all").realClick();
    cy.get("#oranges").realClick();

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#citrus").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get("#citrus").realClick();

    ["pears", "apples", "lemons"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["citrus", "oranges", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#citrus").realClick();

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });

  it("❌ → Parent ✅ → All 🔄", () => {
    cy.get("#juicy").realClick();

    ["juicy", "lemons", "citrus", "clementines", "oranges"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("not.be.checked");
    });

    cy.get("#all").realClick();

    ["juicy", "lemons", "citrus", "clementines", "oranges"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });

  it("❌ → Item ✅ → All 🔄", () => {
    cy.get("#oranges").realClick();

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get("#all").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("not.be.checked");
    });

    cy.get("#all").realClick();

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });

  it("❌ → Item ✅ → Parent 🔄", () => {
    cy.get("#oranges").realClick();

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#citrus").realClick();

    ["citrus", "oranges", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples", "lemons"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });

    cy.get("#citrus").realClick();

    cy.get("input[type='checkbox']").each(checkbox => {
      cy.wrap(checkbox).should("not.be.checked");
    });

    cy.get("#citrus").realClick();

    ["oranges"].forEach(id => {
      cy.get(`#${id}`).should("be.checked");
    });

    ["pears", "apples", "lemons", "clementines"].forEach(id => {
      cy.get(`#${id}`).should("not.be.checked");
    });

    ["all", "juicy", "citrus"].forEach(id => {
      cy.get(`#${id}:indeterminate`).should("exist");
    });
  });
});
