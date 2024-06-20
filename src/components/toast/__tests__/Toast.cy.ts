import ToastTest from "./Toast.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(ToastTest);

  cy.a11y();

  cy.getByRole("status").should("not.exist");

  cy.contains("Toggle").realClick();

  cy.getByRole("status").as("toast");

  cy.get("@toast").should("be.visible");
  cy.get("@toast").shouldHaveAria("atomic", true);
  cy.get("@toast").shouldHaveAria("live", "polite");
  cy.get("@toast").should("have.attr", "tabindex", 0);

  cy.contains("Remove item").shouldHaveAria(
    "label",
    "Go to 'Groceries' to remove item"
  );
});

describe("Can close", () => {
  it("By clicking <Toast.Close />", () => {
    cy.mount(ToastTest);

    cy.contains("Toggle").realClick();

    cy.getByRole("status").as("toast");

    cy.get("@toast").should("be.visible");

    cy.contains("Close notification").realClick();

    cy.get("@toast").should("not.exist");
  });

  it("Automatically after some time", () => {
    cy.mount(ToastTest);

    cy.contains("Toggle").realClick();

    cy.getByRole("status").as("toast");

    cy.get("@toast").should("be.visible");

    cy.get("body").realClick({
      position: "topLeft",
    });

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(16000);

    cy.get("@toast").should("not.exist");
  });
});

it("Prevents automatic closing when user is interacting with toast", () => {
  cy.mount(ToastTest);

  cy.contains("Toggle").realClick();

  cy.getByRole("status").as("toast");

  cy.get("@toast").should("be.visible");

  cy.contains("Remove item").focus();

  /* eslint-disable-next-line cypress/no-unnecessary-waiting */
  cy.wait(20000);

  cy.get("@toast").should("be.visible");
});
