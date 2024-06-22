import TabsTest from "./Tabs.test.vue";
import CarouselTest from "./Carousel.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(TabsTest);
  cy.a11y();

  cy.getByRole("tablist").shouldHaveAria("labelledby", "title");

  cy.getByRole("tablist").within(() => {
    cy.getByRole("tab").should("have.length", 2);
  });

  cy.getByRole("tabpanel")
    .should("have.length", 1)
    .should("have.attr", "aria-labelledby", "zero-list-item");

  cy.get("#outside-button").focus();

  cy.realPress("Tab");
  cy.getByRole("tab")
    .filter("#zero-list-item")
    .should("have.focus")
    .shouldHaveAria("selected", true);

  cy.realPress("ArrowRight");
  cy.getByRole("tab").filter("#one-list-item").should("have.focus");

  cy.realPress("Enter");

  cy.getByRole("tab").filter("#one-list-item").shouldHaveAria("selected", true);

  cy.getByRole("tabpanel")
    .should("have.length", 1)
    .shouldHaveAria("labelledby", "one-list-item");
});

it("Should be able to complete a full interaction", () => {
  cy.mount(TabsTest);

  cy.getByRole("tab").filter("#one-list-item").click();
  cy.assertTabs("tabs", "should.have.panel-open", "one");

  cy.getByRole("tab").filter("#zero-list-item").click();
  cy.assertTabs("tabs", "should.have.panel-open", "zero");
});

describe("Keyboard navigation", () => {
  describe("{Tab}", () => {
    it("Can focus into the tab list, placing the focus on the open item", () => {
      cy.mount(TabsTest);
      cy.get("#outside-button").focus();

      cy.realPress("Tab");
      cy.assertTabs("tabs", "should.have.focus-on", "zero");
    });

    it("Moves focus from tab list item to it's panel when {Tab} is pressed on the tab list item", () => {
      cy.mount(TabsTest);
      cy.get("#outside-button").focus();

      cy.realPress("Tab");
      cy.assertTabs("tabs", "should.have.focus-on", "zero");

      cy.realPress("Tab");
      cy.assertTabs("tabs", "should.have.panel-focused", "zero");
    });
  });

  it("Can switch tab with {ArrowKey} and {Enter}", () => {
    cy.mount(TabsTest);
    cy.get("#outside-button").focus();

    cy.realPress("Tab");
    cy.getByRole("tablist").shouldHaveAria("labelledby", "title");

    cy.assertTabs("tabs", "should.have.focus-on", "zero");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");

    cy.realPress("ArrowRight");
    cy.assertTabs("tabs", "should.have.focus-on", "one");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");

    cy.realPress("Enter");
    cy.assertTabs("tabs", "should.have.focus-on", "one");
    cy.assertTabs("tabs", "should.have.panel-open", "one");
    cy.assertTabs("tabs", "should.have.panel-removed", "zero");

    cy.realPress("Tab");
    cy.assertTabs("tabs", "should.have.panel-focused", "one");
  });

  it("Can switch tab with {ArrowKey} and {Space}", () => {
    cy.mount(TabsTest);
    cy.get("#outside-button").focus();

    cy.realPress("Tab");
    cy.getByRole("tablist").shouldHaveAria("labelledby", "title");

    cy.assertTabs("tabs", "should.have.focus-on", "zero");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");

    cy.realPress("ArrowRight");
    cy.assertTabs("tabs", "should.have.focus-on", "one");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");

    cy.realPress("Space");
    cy.assertTabs("tabs", "should.have.focus-on", "one");
    cy.assertTabs("tabs", "should.have.panel-open", "one");
    cy.assertTabs("tabs", "should.have.panel-removed", "zero");

    cy.realPress("Tab");
    cy.assertTabs("tabs", "should.have.panel-focused", "one");
  });

  it("Can switch tab with {ArrowKey} when automatic activation is on", () => {
    cy.mount(TabsTest, {
      props: {
        openTabOnFocus: true,
      },
    });

    cy.get("#outside-button").focus();

    cy.realPress("Tab");
    cy.getByRole("tablist").shouldHaveAria("labelledby", "title");

    cy.assertTabs("tabs", "should.have.focus-on", "zero");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");

    cy.realPress("ArrowRight");
    cy.assertTabs("tabs", "should.have.focus-on", "one");
    cy.assertTabs("tabs", "should.have.panel-open", "one");
    cy.assertTabs("tabs", "should.have.panel-closed", "zero");

    cy.realPress("ArrowLeft");
    cy.assertTabs("tabs", "should.have.focus-on", "zero");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");
    cy.assertTabs("tabs", "should.have.panel-closed", "one");
  });

  it("Can jump to first and last tab with {Home} and {End}", () => {
    cy.mount(TabsTest);
    cy.get("#outside-button").focus();

    cy.realPress("Tab");
    cy.getByRole("tablist").shouldHaveAria("labelledby", "title");

    cy.assertTabs("tabs", "should.have.focus-on", "zero");
    cy.assertTabs("tabs", "should.have.panel-open", "zero");

    cy.realPress("End");
    cy.assertTabs("tabs", "should.have.focus-on", "one");

    cy.realPress("Home");
    cy.assertTabs("tabs", "should.have.focus-on", "zero");
  });

  /**
   * @Todo Make changes to the menu component,
   */
  it.skip("{Shift} + {F10} Can open associated dropdown menu for tab", () => ({}));

  /**
   * @TODO Add ability to edit tabs
   */
  describe.skip("Ability to edit tabs", () => {
    it("{Delete}", () => ({}));
  });
});

describe("Carousel", () => {
  beforeEach(() => {
    cy.mount(CarouselTest);
  });

  it("Automatically loops through tabs", () => {
    cy.assertTabs("carousel", "should.have.panel-open", "zero");

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "one");

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "zero");
  });

  it("Can pause and resume with <Tabs.IntervalController />", () => {
    cy.assertTabs("carousel", "should.have.panel-open", "zero");

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "one");

    cy.contains("Pause").click();

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "one");

    cy.contains("Resume").click();

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "zero");
  });

  it("Can use next and previous buttons", () => {
    cy.assertTabs("carousel", "should.have.panel-open", "zero");

    cy.contains("Next").click();
    cy.assertTabs("carousel", "should.have.panel-open", "one");

    cy.contains("Next").click();
    cy.assertTabs("carousel", "should.have.panel-open", "zero");

    cy.contains("Next").click();
    cy.assertTabs("carousel", "should.have.panel-open", "one");

    cy.contains("Previous").click();
    cy.assertTabs("carousel", "should.have.panel-open", "zero");
  });

  it("Pauses when hovering <Tabs.Tabs />", () => {
    cy.assertTabs("carousel", "should.have.panel-open", "zero");

    cy.get("#carousel").realHover();

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "zero");

    cy.get("body").realHover({
      position: "topLeft",
    });

    /* eslint-disable-next-line cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.assertTabs("carousel", "should.have.panel-open", "one");
  });

  describe("Pause and resume with focus inside <Tabs.Tabs />", () => {
    it("Pauses when focus is inside <Tabs.Tabs />", () => {
      cy.assertTabs("carousel", "should.have.panel-open", "zero");

      cy.get("#zero").focus();

      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(3500);
      cy.assertTabs("carousel", "should.have.panel-open", "zero");

      cy.get("#outside-button").focus();

      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(3500);
      cy.assertTabs("carousel", "should.have.panel-open", "one");
    });

    it("Avoids resuming when focus is lost if hovering inside <Tabs.Tabs />", () => {
      cy.assertTabs("carousel", "should.have.panel-open", "zero");

      cy.get("#zero").focus();

      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(3500);
      cy.assertTabs("carousel", "should.have.panel-open", "zero");

      cy.get("#zero").realHover();
      cy.getByRole("tablist").focus();

      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(3500);
      cy.assertTabs("carousel", "should.have.panel-open", "zero");

      cy.get("body").realHover({ position: "topLeft" });
      cy.get("#outside-button").focus();

      /* eslint-disable-next-line cypress/no-unnecessary-waiting */
      cy.wait(3500);
      cy.assertTabs("carousel", "should.have.panel-open", "one");
    });
  });
});
