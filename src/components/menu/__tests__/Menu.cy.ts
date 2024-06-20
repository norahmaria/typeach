import MenuTest from "./Menu.test.vue";
import MenuTypeaheadTest from "./Menu.typeahead.test.vue";

beforeEach(() => {
  /**
   * Avoid issues with the
   * `hardEscape` throttling in
   * popovers.
   */
  cy.slowDown(70);
});

afterEach(() => {
  /**
   * Return to normal speed.
   */
  cy.slowDownEnd();
});

it("Renders with accessible attributes", () => {
  cy.mount(MenuTest);
  cy.a11y();

  cy.assertMenu("menu", "should.be.closed");

  cy.get("#menu-trigger")
    .should("have.attr", "tabindex", 0)
    .shouldHaveAria("haspopup", "menu")
    .realClick();

  cy.assertMenu("menu", "should.be.open");

  cy.get("#submenu-trigger")
    .should("have.attr", "tabindex", 0)
    .shouldHaveAria("haspopup", "menu")
    .realHover();

  cy.assertMenu("submenu", "should.be.open");

  cy.get("#nested-submenu-trigger")
    .should("have.attr", "tabindex", 0)
    .shouldHaveAria("haspopup", "menu")
    .realHover();

  cy.assertMenu("nested-submenu", "should.be.open");

  cy.get("#second-nested-submenu-trigger")
    .should("have.attr", "tabindex", 0)
    .shouldHaveAria("haspopup", "menu")
    .realHover();

  cy.assertMenu("second-nested-submenu", "should.be.open");

  cy.getByRole("menuitem").should("have.length", 8);

  cy.getByRole("menuitemcheckbox")
    .should("have.length", 1)
    .each(item => cy.wrap(item).shouldHaveAria("checked", false));

  cy.getByRole("menuitemradio")
    .should("have.length", 1)
    .each(item => cy.wrap(item).shouldHaveAria("checked", false));

  cy.a11y();
});

describe("Menu trigger", () => {
  beforeEach(() => {
    cy.mount(MenuTest);
  });

  describe("Can open", () => {
    it("On click", () => {
      cy.get("#menu-trigger").realClick();
      cy.assertMenu("menu", "should.be.open");
    });

    it("On touch", () => {
      cy.get("#menu-trigger").realTouch();
      cy.assertMenu("menu", "should.be.open");
    });
  });

  describe("Keyboard navigation", () => {
    beforeEach(() => {
      cy.get("#menu-trigger").focus();
    });

    describe("Can open", () => {
      it("When pressing {Enter}, opens to the first item", () => {
        cy.realPress("Enter");
        cy.assertMenu("menu", "should.be.open");
        cy.assertMenu("menu", "should.have.focus-on", "Menu item");
        // cy.assertMenu("menu", "should.be.open");
      });

      it("When pressing {Space}, opens to the first item", () => {
        cy.realPress("Space");
        cy.assertMenu("menu", "should.be.open");
        cy.assertMenu("menu", "should.have.focus-on", "Menu item");
        cy.assertMenu("menu", "should.be.open");
      });

      it("When pressing {ArrowDown}, opens to the first item", () => {
        cy.realPress("ArrowDown");
        cy.assertMenu("menu", "should.be.open");
        cy.assertMenu("menu", "should.have.focus-on", "Menu item");
        cy.assertMenu("menu", "should.be.open");
      });

      it("When pressing {ArrowUp}, opens to the last item", () => {
        cy.realPress("ArrowUp");
        cy.assertMenu("menu", "should.be.open");
        cy.assertMenu("menu", "should.have.focus-on", "Submenu");
        cy.assertMenu("menu", "should.be.open");
      });
    });
  });
});

describe("Menu", () => {
  beforeEach(() => {
    cy.mount(MenuTest, {
      props: {
        onClick: cy.spy().as("click"),
        onChecked: cy.spy().as("checked"),
        onRadioValue: cy.spy().as("radio-value"),
      },
    });
  });

  it("Should be able to complete a full interaction", () => {
    cy.get("#menu-trigger").realClick();
    cy.assertMenu("menu", "should.be.open");

    cy.contains("Submenu").realHover();
    cy.assertMenu("submenu", "should.be.open");

    cy.contains("Nested submenu").realHover();
    cy.assertMenu("nested-submenu", "should.be.open");

    cy.contains("Submenu item").realClick();
    cy.assertMenu("menu", "should.be.closed");

    cy.get("@click").should("have.been.calledWith", "Submenu item");
  });

  describe("Keyboard navigation", () => {
    beforeEach(() => {
      cy.get("#menu-trigger").focus();
      cy.realPress("Enter");
    });

    it("Should be able to complete a full interaction", () => {
      cy.assertMenu("menu", "should.be.open");
      cy.assertMenu("menu", "should.have.focus-on", "Menu item");

      cy.realPress("ArrowDown");
      cy.assertMenu("menu", "should.have.focus-on", "Submenu");

      cy.realPress("ArrowRight");
      cy.assertMenu("submenu", "should.be.open");
      cy.assertMenu("submenu", "should.have.focus-on", "Submenu item");

      cy.realPress("ArrowDown");
      cy.realPress("ArrowDown");
      cy.realPress("ArrowRight");
      cy.assertMenu("nested-submenu", "should.be.open");
      cy.assertMenu("nested-submenu", "should.have.focus-on", "Nested submenu item"); /* prettier-ignore */

      cy.realPress("Enter");
      cy.assertMenu("menu", "should.be.closed");

      cy.get("@click").should("have.been.calledWith", "Nested submenu item");
    });

    describe("Closes when pressing {Tab}", () => {
      it("Without {Shift}", () => {
        cy.realPress("Tab");
        cy.assertMenu("menu", "should.be.closed");

        cy.get("#menu-trigger").should("have.focus");
      });

      it("With {Shift}", () => {
        cy.realPress(["Shift", "Tab"]);
        cy.assertMenu("menu", "should.be.closed");

        cy.get("#menu-trigger").should("have.focus");
      });
    });

    describe("Can select with {Enter}", () => {
      it("On a <Menu.Item />, activating the item and closing the menu", () => {
        cy.realPress("Enter");

        cy.assertMenu("menu", "should.be.closed");

        cy.get("@click").should("have.been.calledWith", "Menu item");
      });

      it("On a <Menu.Trigger />, opening the submenu on the first item", () => {
        cy.realPress("ArrowDown");
        cy.realPress("Enter");
        cy.realPress("ArrowDown");
        cy.realPress("ArrowDown");
        cy.realPress("Enter");

        cy.assertMenu("nested-submenu", "should.be.open");
        cy.assertMenu("nested-submenu", "should.have.focus-on", "Nested submenu item"); /* prettier-ignore */
      });

      it("On a <Menu.CheckboxItem />, toggling the checkbox and closing the menu", () => {
        cy.realPress("ArrowDown");
        cy.realPress("Enter");
        cy.realPress("ArrowDown");
        cy.realPress("ArrowDown");
        cy.realPress("Enter");
        cy.realPress("ArrowDown");
        cy.realPress("Enter");

        cy.assertMenu("menu", "should.be.closed");
        cy.assertMenu("nested-submenu", "should.have.checked", "Checkbox");

        cy.get("@checked").should("have.been.calledWith", true);
      });

      it("On a <Menu.RadioItem />, selecting the item and closing the menu", () => {
        cy.realPress("ArrowDown");
        cy.realPress("Enter");
        cy.realPress("ArrowDown");
        cy.realPress("ArrowDown");
        cy.realPress("Enter");
        cy.realPress("ArrowDown");
        cy.realPress("ArrowDown");
        cy.realPress("Enter");

        cy.assertMenu("menu", "should.be.closed");
        cy.assertMenu("nested-submenu", "should.have.checked", "Radio");

        cy.get("@radio-value").should("have.been.calledWith", "value");
      });
    });

    /**
     * @Todo Figure out which behaviour is expected here,
     * every documentation and spec list describe it as
     * below, while every actual implementation i've seen treats
     * {Space} just like {Enter}.
     */
    describe.skip("Can select with {Space}", () => {
      it("On a <Menu.Trigger />, opening the submenu on the first item", () => ({}));
      it("On a <Menu.CheckboxItem />, toggling the checkbox without closing the menu", () => ({}));
      it("On a <Menu.RadioItem />, selecting the item without closing the menu", () => ({}));
    });

    it("Does not select disabled items on {Enter}", () => {
      cy.realPress("ArrowDown");
      cy.realPress("Enter");

      cy.realPress("ArrowDown");
      cy.realPress("Enter");

      cy.assertMenu("menu", "should.be.open");
      cy.assertMenu("submenu", "should.be.open");

      cy.get("@click").should("not.have.been.called");
    });

    describe("Arrow Keys", () => {
      it("{ArrowDown} and {ArrowUp} navigates up and down", () => {
        cy.realPress("ArrowDown");

        cy.assertMenu("menu", "should.have.focus-on", "Submenu");

        cy.realPress("ArrowUp");

        cy.assertMenu("menu", "should.have.focus-on", "Menu item");
      });

      it("{ArrowRight} and {ArrowLeft} can open and close submenu", () => {
        cy.realPress("ArrowDown");
        cy.realPress("ArrowRight");

        cy.assertMenu("submenu", "should.be.open");
        cy.assertMenu("submenu", "should.have.focus-on", "Submenu item");

        cy.realPress("ArrowLeft");

        cy.assertMenu("submenu", "should.be.closed");
        cy.assertMenu("menu", "should.have.focus-on", "Submenu");
      });

      it("{ArrowLeft} does nothing when outside a submenu", () => {
        cy.realPress("ArrowLeft");

        cy.assertMenu("menu", "should.be.open");
        cy.assertMenu("menu", "should.have.focus-on", "Menu item");
      });

      it("{Home} and {End} moves focus to first and last items", () => {
        cy.realPress("ArrowDown");
        cy.assertMenu("menu", "should.have.focus-on", "Submenu");

        cy.realPress("Home");
        cy.assertMenu("menu", "should.have.focus-on", "Menu item");

        cy.realPress("End");
        cy.assertMenu("menu", "should.have.focus-on", "Submenu");
      });
    });
  });

  it("Can switch back and forth between pointer and keyboard navigation", () => {
    cy.mount(MenuTest);
    cy.get("#menu-trigger").focus();
    cy.realPress("Enter");

    /* (Key) Item → (Hover) Item, on the same item */

    cy.realPress("ArrowDown");
    cy.realPress("Enter");
    cy.assertMenu("submenu", "should.have.focus-on", "Submenu item");

    cy.contains("Menu item").realHover();
    cy.assertMenu("menu", "should.have.focus-on", "Menu item");
    cy.assertMenu("menu", "should.be.open");
    cy.assertMenu("submenu", "should.be.closed");

    /* (Key) Trigger → (Hover) Trigger, on the same trigger */

    cy.realPress("ArrowDown");
    cy.assertMenu("menu", "should.have.focus-on", "Submenu");
    cy.assertMenu("submenu", "should.be.closed");

    cy.contains("Submenu").realHover();
    cy.assertMenu("menu", "should.have.focus-on", "Submenu");
    cy.assertMenu("submenu", "should.be.open");

    /* (Key) Item → (Hover) Trigger */

    cy.realPress("ArrowUp");
    cy.assertMenu("menu", "should.have.focus-on", "Menu item");
    cy.assertMenu("submenu", "should.be.closed");

    cy.get("body").realHover();
    cy.contains("Submenu").realHover();
    cy.assertMenu("menu", "should.have.focus-on", "Submenu");
    cy.assertMenu("submenu", "should.be.open");

    /* (Hover) Trigger → (Key) Trigger, on the same-level */

    cy.contains("Second nested submenu").realHover();
    cy.assertMenu("second-nested-submenu", "should.be.open");

    cy.realPress("ArrowUp");
    cy.assertMenu("submenu", "should.have.focus-on", "Nested submenu");
    cy.assertMenu("second-nested-submenu", "should.be.closed");
  });
});

describe("Menu (useKeyboardList) supports typeahead", () => {
  beforeEach(() => {
    cy.mount(MenuTypeaheadTest);
    cy.get("#menu-trigger").focus();
    cy.realPress("Enter");
  });

  it("Pressing a {Character} moves focus to the first matching item", () => {
    cy.realPress("C");
    cy.assertMenu("menu", "should.have.focus-on", "Chase Adams");
  });

  it("Repeating the same {Character} loops through the matching items", () => {
    cy.realPress("C");
    cy.assertMenu("menu", "should.have.focus-on", "Chase Adams");

    cy.realPress("C");
    cy.assertMenu("menu", "should.have.focus-on", "Clayton Evans");

    cy.realPress("C");
    cy.assertMenu("menu", "should.have.focus-on", "Chris Keller");

    cy.realPress("C");
    cy.assertMenu("menu", "should.have.focus-on", "Chase Adams");
  });

  it("Pressing multiple characters fast should focus the first matching item", () => {
    cy.realPress("C");
    cy.realPress("h");

    cy.assertMenu("menu", "should.have.focus-on", "Chris Keller");
  });
});
