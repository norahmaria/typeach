import Select from "./Select.test.vue";
import MultiSelect from "./Select.multi.test.vue";
import EmptySelect from "./Select.empty.test.vue";

const testOpening = () => {
  it("With {Enter}", () => {
    cy.realPress("Enter");

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "Item 1");
  });

  it("With {Space}", () => {
    cy.realPress(" ");

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "Item 1");
  });

  it("With {Home}", () => {
    cy.realPress("Home");

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "None");
  });

  it("With {End}", () => {
    cy.realPress("End");

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "Item 4");
  });

  it("With {DownArrow}", () => {
    cy.realPress("ArrowDown");

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "Item 1");
  });

  it("With {DownArrow} + {Alt}", () => {
    cy.realPress(["ArrowDown", "Alt"]);

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "Item 1");
  });

  /**
   * @TODO This sort of works, it just doesn't open
   * to the first item, but to the second item,
   * as there is already a selection on an
   * item starting with `I`.`
   */
  it.skip("With {Character}", () => {
    cy.realPress("I");

    cy.assertSelect("select", "should.be.open");
    cy.assertSelect("select", "should.have.focus-on", "Item 2");
  });
};

describe("Renders with accessible attributes", () => {
  it("When single select", () => {
    cy.mount(Select);

    cy.get("#select-trigger")
      .shouldHaveAria("haspopup", "listbox")
      .within(() => {
        cy.contains("one").should("exist");
      });

    cy.get("#select-trigger").realClick();

    cy.getByRole("listbox")
      .shouldHaveAria("multiselectable", "false")
      .shouldHaveAria("activedescendant", "select-one");

    cy.getByRole("option").should("have.length", 5);

    cy.getByRole("option")
      .filter(":not(#select-one)")
      .each(element => {
        cy.wrap(element).shouldHaveAria("selected", "false");
      });

    cy.get("#select-one").shouldHaveAria("selected", "true");

    cy.contains("Item 2").realClick();

    cy.get("#select-trigger").within(() => {
      cy.contains("two").should("exist");
    });

    cy.get("#select-list").should("not.be.visible");
  });

  it("For multi select", () => {
    cy.mount(MultiSelect);

    cy.get("#select-trigger")
      .shouldHaveAria("haspopup", "listbox")
      .within(() => {
        cy.contains("one").should("exist");
      });

    cy.get("#select-trigger").realClick();

    cy.getByRole("listbox")
      .shouldHaveAria("multiselectable", "true")
      .shouldHaveAria("activedescendant", "select-one");

    cy.getByRole("option").should("have.length", 5);

    cy.getByRole("option")
      .filter(":not(#select-one)")
      .each(element => {
        cy.wrap(element).shouldHaveAria("selected", "false");
      });

    cy.get("#select-one").shouldHaveAria("selected", "true");

    cy.contains("Item 2").realClick();

    cy.get("#select-trigger").within(() => {
      cy.contains("two").should("exist");
    });

    cy.get("#select-list").should("be.visible");
  });
});

describe("Readonly", () => {
  beforeEach(() => {
    cy.mount(MultiSelect, {
      props: {
        readonly: true,
      },
    });
  });

  it("Renders with accessible attributes", () => {
    cy.get("#select-trigger")
      .shouldHaveAria("haspopup", "listbox")
      .within(() => {
        cy.contains("one").should("exist");
      });

    cy.get("#select-trigger").realClick();

    cy.getByRole("listbox")
      .shouldHaveAria("multiselectable", "true")
      .shouldHaveAria("activedescendant", "select-one");

    cy.getByRole("option").should("have.length", 5);

    cy.getByRole("option").each(element => {
      cy.wrap(element).shouldHaveAria("disabled", "true");
    });

    cy.getByRole("option")
      .filter(":not(#select-one)")
      .each(element => {
        cy.wrap(element).shouldHaveAria("selected", "false");
      });

    cy.get("#select-one").shouldHaveAria("selected", "true");

    cy.contains("Item 2").realClick();

    cy.get("#select-trigger").within(() => {
      cy.contains("two").should("not.exist");
    });

    cy.get("#select-list").should("be.visible");
  });

  describe("Prevents selection", () => {
    it("With click", () => {
      cy.get("#select-trigger").realClick();

      cy.contains("Item 4").realHover();
      cy.assertSelect("select", "should.have.focus-on", "Item 4");

      cy.contains("Item 1").realClick();
      cy.contains("Item 2").realClick();
      cy.contains("Item 3").realClick();

      cy.get("#select-trigger").within(() => cy.contains("select-two").should("not.exist")); /* prettier-ignore */
      cy.get("#select-trigger").within(() => cy.contains("select-three").should("not.exist")); /* prettier-ignore */
      cy.get("#select-trigger").within(() => cy.contains("select-one").should("exist")); /* prettier-ignore */

      cy.get("body").realClick({
        position: "topLeft",
      });

      cy.assertSelect("select", "should.be.closed");

      cy.get("#select-trigger").realClick();
      cy.assertSelect("select", "should.have.focus-on", "Item 1");
      cy.assertSelect("select", "should.not.have.selected", "Item 2");
      cy.assertSelect("select", "should.not.have.selected", "Item 3");

      cy.contains("Item 3").realClick();
      cy.get("#select-trigger").within(() => cy.contains("select-three").should("not.exist")); /* prettier-ignore */
      cy.get("#select-trigger").within(() => cy.contains("select-two").should("not.exist")); /* prettier-ignore */

      cy.get("body").realClick({
        position: "topLeft",
      });

      cy.assertSelect("select", "should.be.closed");
    });

    it("With keyboard", () => {
      cy.get("#select-trigger").focus();

      cy.realPress("End");
      cy.realPress("ArrowUp");
      cy.realPress("Enter");

      cy.get("#select-trigger").focus();

      cy.realPress("Enter");
      cy.assertSelect("select", "should.not.have.selected", "Item 3");

      cy.realPress(["Shift", "ArrowUp"]);
      cy.assertSelect("select", "should.not.have.selected", "Item 3");

      cy.realPress(["Shift", "ArrowDown"]);
      cy.assertSelect("select", "should.not.have.selected", "Item 3");
      cy.assertSelect("select", "should.not.have.selected", "Item 4");

      cy.realPress(["Shift", " "]);
      cy.assertSelect("select", "should.not.have.selected", "Item 3");

      cy.realPress(["Control", "Shift", "Home"]);
      cy.assertSelect("select", "should.not.have.selected", "Item 3");

      cy.realPress(["Control", "A"]);
      cy.assertSelect("select", "should.not.have.selected", "Item 3");

      cy.realPress(["Control", "Shift", "End"]);
      cy.assertSelect("select", "should.not.have.selected", "Item 3");
      cy.assertSelect("select", "should.not.have.selected", "Item 4");

      cy.assertSelect("select", "should.have.selected", "Item 1");
    });
  });
});

describe("Should be able to complete a full interaction", () => {
  it("Single select", () => {
    cy.mount(Select);

    cy.get("#select-trigger").realClick();

    cy.contains("Item 4").realHover();
    cy.assertSelect("select", "should.have.focus-on", "Item 4");

    cy.contains("Item 2").realClick();
    cy.get("#select-trigger").within(() => cy.contains("select-two").should("exist")); /* prettier-ignore */
    cy.assertSelect("select", "should.be.closed");

    cy.get("#select-trigger").realClick();
    cy.assertSelect("select", "should.have.selected", "Item 2");
    cy.assertSelect("select", "should.have.focus-on", "Item 2");

    cy.contains("Item 3").realClick();
    cy.get("#select-trigger").within(() => cy.contains("select-three").should("exist")); /* prettier-ignore */
    cy.get("#select-trigger").within(() => cy.contains("select-two").should("not.exist")); /* prettier-ignore */

    cy.assertSelect("select", "should.be.closed");
  });

  it("Multi select", () => {
    cy.mount(MultiSelect);

    cy.get("#select-trigger").realClick();

    cy.contains("Item 4").realHover();
    cy.assertSelect("select", "should.have.focus-on", "Item 4");

    cy.contains("Item 1").realClick();
    cy.contains("Item 2").realClick();
    cy.contains("Item 3").realClick();

    cy.get("#select-trigger").within(() => cy.contains("select-two").should("exist")); /* prettier-ignore */
    cy.get("#select-trigger").within(() => cy.contains("select-three").should("exist")); /* prettier-ignore */
    cy.get("#select-trigger").within(() => cy.contains("select-one").should("not.exist")); /* prettier-ignore */

    cy.get("body").realClick({
      position: "topLeft",
    });

    cy.assertSelect("select", "should.be.closed");

    cy.get("#select-trigger").realClick();
    cy.assertSelect("select", "should.have.focus-on", "Item 2");
    cy.assertSelect("select", "should.have.selected", "Item 2");
    cy.assertSelect("select", "should.have.selected", "Item 3");

    cy.contains("Item 3").realClick();
    cy.get("#select-trigger").within(() => cy.contains("select-three").should("not.exist")); /* prettier-ignore */
    cy.get("#select-trigger").within(() => cy.contains("select-two").should("exist")); /* prettier-ignore */

    cy.get("body").realClick({
      position: "topLeft",
    });

    cy.assertSelect("select", "should.be.closed");
  });
});

describe("Keyboard navigation", () => {
  describe("Can deal with initially no selection", () => {
    it("Single select", () => {
      cy.mount(EmptySelect, {
        props: {
          multiSelect: false,
        },
      });
    });

    it("Multi select", () => {
      cy.mount(EmptySelect, {
        props: {
          multiSelect: true,
        },
      });
    });

    afterEach(() => {
      cy.get("#select-trigger").focus();

      cy.realPress("Enter");

      cy.contains("No selection").should("exist");

      cy.get("body").realClick({
        position: "topLeft",
      });

      cy.get("#select-trigger").focus();
      cy.realPress("Enter");

      cy.assertSelect("select", "should.have.focus-on", "None");
    });
  });

  describe("Single select", () => {
    describe("Can open", () => {
      beforeEach(() => {
        cy.mount(Select);
        cy.get("#select-trigger").focus();
      });

      testOpening();
    });

    /**
     * useKeyboardList is tested across multiple tests,
     * so there should be no need to test it here.
     */
    it.skip("Can do simple navigation", () => ({}));

    it("Does not trigger multi select shortcuts", () => {
      cy.mount(Select);
      cy.get("#select-trigger").focus();

      cy.realPress("End");
      cy.realPress("ArrowUp");
      cy.realPress("Enter");

      cy.get("#select-trigger").focus();
      cy.realPress("Enter");

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");

      cy.realPress(["Shift", "ArrowUp"]);

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");

      cy.realPress(["Shift", "ArrowDown"]);

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");
      cy.assertSelect("select", "should.not.have.selected", "Item 4");

      cy.realPress(["Shift", " "]);

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");

      cy.realPress(["Control", "Shift", "Home"]);

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");
      cy.assertSelect("select", "should.not.have.selected", "Item 1");

      cy.realPress(["Control", "A"]);

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");
      cy.assertSelect("select", "should.not.have.selected", "Item 1");

      cy.realPress(["Control", "Shift", "End"]);

      cy.assertSelect("select", "should.have.selected", "Item 3");
      cy.assertSelect("select", "should.have.focus-on", "Item 3");
      cy.assertSelect("select", "should.not.have.selected", "Item 4");
    });

    describe("Can select", () => {
      beforeEach(() => {
        cy.mount(Select);
        cy.get("#select-trigger").focus();

        cy.realPress("End");
      });

      it("With {Enter}", () => {
        cy.realPress("Enter");

        cy.assertSelect("select", "should.have.selected", "Item 4");
        cy.assertSelect("select", "should.be.closed");

        cy.get("#select-trigger").should("have.focus");
      });

      it("With {Space}", () => {
        cy.realPress(" ");

        cy.assertSelect("select", "should.have.selected", "Item 4");
        cy.assertSelect("select", "should.be.closed");

        cy.get("#select-trigger").should("have.focus");
      });

      it("With {Tab}", () => {
        cy.realPress(" ");

        cy.assertSelect("select", "should.have.selected", "Item 4");
        cy.assertSelect("select", "should.be.closed");
      });

      it("With {ArrowUp} + {Alt}", () => {
        cy.realPress(["Alt", "ArrowUp"]);

        cy.assertSelect("select", "should.have.selected", "Item 4");
        cy.assertSelect("select", "should.be.closed");

        cy.get("#select-trigger").should("have.focus");
      });
    });
  });

  describe("Multi select", () => {
    describe("Can open", () => {
      beforeEach(() => {
        cy.mount(MultiSelect);
        cy.get("#select-trigger").focus();
      });

      testOpening();
    });

    /**
     * useKeyboardList is tested across multiple tests,
     * so there should be no need to test it here.
     */
    it.skip("Can do simple navigation", () => ({}));

    describe("Can select", () => {
      beforeEach(() => {
        cy.mount(MultiSelect);
        cy.get("#select-trigger").focus();

        cy.realPress("Enter");
      });

      describe("Without closing", () => {
        it("With {Enter}", () => {
          cy.realPress("End");
          cy.realPress("Enter");

          cy.assertSelect("select", "should.have.selected", "Item 4");
          cy.assertSelect("select", "should.be.open");
        });

        it("With {Space}", () => {
          cy.realPress("End");
          cy.realPress(" ");

          cy.assertSelect("select", "should.have.selected", "Item 4");
          cy.assertSelect("select", "should.be.open");
        });
      });

      describe("By toggling with {ArrowKey} + {Shift}", () => {
        it("{ArrowUp} + {Shift}", () => {
          cy.realPress(["Shift", "ArrowUp"]);

          cy.assertSelect("select", "should.have.focus-on", "None");
          cy.assertSelect("select", "should.have.selected", "None");
        });

        it("{ArrowDown} + {Shift}", () => {
          cy.realPress(["Shift", "ArrowDown"]);

          cy.assertSelect("select", "should.have.focus-on", "Item 2");
          cy.assertSelect("select", "should.have.selected", "Item 2");
        });
      });

      describe("Multiple with keyboard shortcuts", () => {
        it("{Shift} + {Space} to select from focused item to last selected item", () => {
          cy.realPress("ArrowDown");
          cy.realPress("Enter");

          cy.assertSelect("select", "should.have.selected", "Item 2");

          cy.realPress("ArrowDown");
          cy.realPress("ArrowDown");

          cy.assertSelect("select", "should.have.focus-on", "Item 4");

          cy.realPress(["Shift", " "]);

          cy.assertSelect("select", "should.have.selected", "Item 2");
          cy.assertSelect("select", "should.have.selected", "Item 3");
          cy.assertSelect("select", "should.have.selected", "Item 4");
        });

        it("{Control} + {Shift} + {Home} to select from focused item to first item", () => {
          cy.realPress("ArrowDown");
          cy.realPress("Enter");

          cy.assertSelect("select", "should.have.selected", "Item 2");

          cy.realPress("ArrowDown");

          cy.assertSelect("select", "should.have.focus-on", "Item 3");

          cy.realPress(["Control", "Shift", "Home"]);

          cy.assertSelect("select", "should.have.selected", "None");
          cy.assertSelect("select", "should.have.selected", "Item 1");
          cy.assertSelect("select", "should.have.selected", "Item 2");
          cy.assertSelect("select", "should.have.selected", "Item 3");
        });

        it("{Control} + {Shift} + {End} to select from focused item to last item", () => {
          cy.realPress(["Control", "Shift", "End"]);

          cy.assertSelect("select", "should.have.selected", "Item 1");
          cy.assertSelect("select", "should.have.selected", "Item 2");
          cy.assertSelect("select", "should.have.selected", "Item 3");
          cy.assertSelect("select", "should.have.selected", "Item 4");
        });

        it("{Control} + {A} to select/unselect all", () => {
          cy.realPress(["Control", "A"]);

          cy.assertSelect("select", "should.have.selected", "None");
          cy.assertSelect("select", "should.have.selected", "Item 1");
          cy.assertSelect("select", "should.have.selected", "Item 2");
          cy.assertSelect("select", "should.have.selected", "Item 3");
          cy.assertSelect("select", "should.have.selected", "Item 4");

          cy.realPress(["Control", "A"]);

          cy.assertSelect("select", "should.not.have.selected", "None");
          cy.assertSelect("select", "should.not.have.selected", "Item 1");
          cy.assertSelect("select", "should.not.have.selected", "Item 2");
          cy.assertSelect("select", "should.not.have.selected", "Item 3");
          cy.assertSelect("select", "should.not.have.selected", "Item 4");
        });
      });

      it("Prevents selection with {Tab}", () => {
        cy.realPress("Tab");

        cy.assertSelect("select", "should.not.have.selected", "Item 4");
        cy.assertSelect("select", "should.be.closed");
      });
    });
  });
});
