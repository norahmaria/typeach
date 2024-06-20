import DatePicker from "./DatePicker.test.vue";

it("Renders with accessible attributes", () => {
  cy.mount(DatePicker);
  cy.contains("Calendar").click();

  cy.get("table").shouldHaveAria("labelledby", "calendar-title");
  cy.get("#calendar-title").should("contain", "December");

  cy.get("thead").within(() => {
    cy.get("th").should("have.length", 7);

    ["SU", "MO", "TU", "WE", "TH", "FR", "SA"].forEach(weekDay => {
      cy.get("th").should("contain", weekDay);
    });
  });

  cy.get("button[aria-pressed").should("have.length", 31);
  cy.assertDatePicker("calendar", "should.have.focus-on", 12);

  cy.contains("21").realHover();
  cy.assertDatePicker("calendar", "should.have.focus-on", 21);
});

it("Should be able to complete a full interaction", () => {
  cy.mount(DatePicker);
  cy.contains("Calendar").click();

  cy.contains("21").realHover();
  cy.assertDatePicker("calendar", "should.have.focus-on", 21);

  cy.contains("30").realClick();
  cy.assertDatePicker("calendar", "should.have.selected", 30);

  cy.get("input").should("have.value", "12/30/2023");
});

it("Should open to date when input has value", () => {
  cy.mount(DatePicker);

  cy.get("input").type("10/27/2023");

  cy.realPress("Tab");
  cy.realPress("Enter");

  cy.get("#calendar-title").should("contain", "October 2023");
  cy.assertDatePicker("calendar", "should.have.focus-on", 27);
});

describe("Keyboard navigation", () => {
  beforeEach(() => {
    cy.mount(DatePicker);
    cy.contains("Calendar").click();
  });

  it("Should be able to complete a full interaction", () => {
    cy.mount(DatePicker);
    cy.contains("Calendar").click();

    cy.realPress("ArrowRight");
    cy.assertDatePicker("calendar", "should.have.focus-on", 13);

    cy.realPress("Enter");
    cy.assertDatePicker("calendar", "should.have.selected", 13);
    cy.get("input").should("have.value", "12/13/2023");
  });

  it("Can move between dates in a week {ArrowRight} and {ArrowLeft}", () => {
    cy.realPress("ArrowRight");
    cy.assertDatePicker("calendar", "should.have.focus-on", 13);

    cy.realPress("ArrowLeft");
    cy.assertDatePicker("calendar", "should.have.focus-on", 12);
  });

  it("Can move between weeks with {ArrowUp} and {ArrowDown}", () => {
    cy.realPress("ArrowUp");
    cy.assertDatePicker("calendar", "should.have.focus-on", 5);

    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.assertDatePicker("calendar", "should.have.focus-on", 19);
  });

  it("Can jump to end and start of week with {Home} and {End}", () => {
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");

    cy.realPress("Home");
    cy.assertDatePicker("calendar", "should.have.focus-on", 24);

    cy.realPress("End");
    cy.assertDatePicker("calendar", "should.have.focus-on", 30);
  });

  it("Can jump between months with {PageUp} and {PageDown}", () => {
    cy.realPress("PageUp");
    cy.realPress("PageUp");

    cy.contains("30").focus();
    cy.realPress("ArrowRight");

    cy.realPress("PageUp");
    cy.assertDatePicker("calendar", "should.have.focus-on", 30);
    cy.get("#calendar-title").should("contain", "September 2023");

    cy.realPress("PageDown");
    cy.assertDatePicker("calendar", "should.have.focus-on", 30);
    cy.get("#calendar-title").should("contain", "October 2023");

    cy.realPress("ArrowRight");
    cy.realPress("PageDown");
    cy.assertDatePicker("calendar", "should.have.focus-on", 30);
    cy.get("#calendar-title").should("contain", "November 2023");
  });

  it("Can jump between years with {PageUp} and {PageDown} when holding {Shift}", () => {
    cy.realPress("PageDown");
    cy.realPress("PageDown");

    cy.get("#calendar-title").should("contain", "February 2024");
    cy.contains("29").focus();

    cy.realPress(["Shift", "PageUp"]);
    cy.get("#calendar-title").should("contain", "February 2023");
    cy.assertDatePicker("calendar", "should.have.focus-on", 28);

    cy.realPress("ArrowLeft");
    cy.realPress(["Shift", "PageDown"]);
    cy.get("#calendar-title").should("contain", "February 2024");
    cy.assertDatePicker("calendar", "should.have.focus-on", 27);
  });
});
