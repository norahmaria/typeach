import NativePopover from "./NativePopover.test.vue";
import NonNativePopover from "./NonNativePopover.test.vue";
import NativePopoverWithIs from "./NativePopoverWithIs.test..vue";
import NonNativePopoverWithIs from "./NonNativePopoverWithIs.test.vue";

it("Can relate trigger to target", () => {
  cy.mount(NativePopover);
  cy.get("button[popovertarget='popover']").should("exist");
});

describe("Supports non-native and native option", () => {
  it("Renders with popovertarget attributes when native", () => {
    cy.mount(NativePopover);

    cy.get("button").should("exist");
    cy.get("button").should("have.attr", "popovertarget");
    cy.get("button").and("have.attr", "type", "button");
  });

  it("Renders without popovertarget attributes when non-native", () => {
    cy.mount(NonNativePopover);

    cy.get("button").should("exist");
    cy.get("button").should("not.have.attr", "popovertarget");
    cy.get("button").and("not.have.attr", "type", "button");
  });

  it("Forces trigger to be a button when native", () => {
    cy.mount(NativePopoverWithIs);

    cy.get("button").should("exist");
    cy.get("span").should("not.exist");
  });

  it("Can override trigger tag when non-native", () => {
    cy.mount(NonNativePopoverWithIs);

    cy.get("span").should("exist");
    cy.get("button").should("not.exist");
  });
});

describe("Can open and close (or prevent it)", () => {
  describe("Can open", () => {
    describe("With click activation", () => {
      beforeEach(() => {
        cy.mount(NativePopover);
        cy.get("#popover").should("not.be.visible");
      });

      it("With mouse", () => {
        cy.get("button").realClick();
      });

      it("With touch", () => {
        cy.get("button").realTouch();
      });

      it("With keyboard", () => {
        cy.get("button").focus();
        cy.realPress("Enter");
      });

      afterEach(() => {
        cy.get("#popover").should("be.visible");
      });
    });

    describe("With hover activation", () => {
      beforeEach(() => {
        cy.mount(NativePopover, { props: { hover: true } });
        cy.get("#popover").should("not.be.visible");
      });

      it("With mouse", () => {
        cy.get("button").realHover();
      });

      it("With keyboard", () => {
        cy.get("button").focus();
      });

      afterEach(() => {
        cy.get("#popover").should("be.visible");
      });
    });
  });

  describe("Can close", () => {
    it("By pressing {Escape}", () => {
      cy.mount(NativePopover);

      cy.get("button").realClick();
      cy.get("#popover").should("be.visible");

      cy.realPress("Escape");
      cy.get("#popover").should("not.be.visible");
    });

    it("With outside click", () => {
      cy.mount(NativePopover);

      cy.get("button").realClick();
      cy.get("#popover").should("be.visible");

      cy.get("body").realClick({ position: "topLeft" });
      cy.get("#popover").should("not.be.visible");
    });

    it("With outside touch", () => {
      cy.mount(NativePopover);

      cy.get("button").realClick();
      cy.get("#popover").should("be.visible");

      cy.get("body").realTouch({ position: "topLeft" });
      cy.get("#popover").should("not.be.visible");
    });

    it("By re-clicking trigger", () => {
      cy.mount(NativePopover);

      cy.get("button").realClick();
      cy.get("#popover").should("be.visible");

      cy.get("button").realClick();
      cy.get("#popover").should("not.be.visible");
    });

    it("With moving cursor out of target when hover", () => {
      cy.mount(NativePopover, { props: { hover: true } });

      cy.get("button").realHover();
      cy.get("#popover").should("be.visible");

      cy.get("#popover").realHover();

      cy.get("body").realHover({ position: "topLeft" });
      cy.get("#popover").should("not.be.visible");
    });
  });

  it("Prevents opening when trigger is disabled", () => {
    cy.mount(NativePopover, { props: { disabled: true } });

    cy.get("button").realClick();
    cy.get("#popover").should("not.be.visible");
  });

  it("Prevents closing when modal", () => {
    cy.mount(NativePopover, { props: { modal: true } });

    cy.get("button").realClick();
    cy.get("#popover").should("be.visible");

    cy.get("body").realClick({ position: "topLeft" });
    cy.get("#popover").should("be.visible");
  });
});
