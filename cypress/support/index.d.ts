/// <reference types="cypress" />

import type { HtmlHTMLAttributes } from "vue";

type PickStartsWith<T extends object, S extends string> = {
  [K in keyof T as K extends `${S}${infer R}` ? K : never]: T[K];
};

type RemovePrefixes<T, P extends string> = {
  [K in keyof T as K extends `${P}${infer NK}` ? NK : never]: T[K];
};

export type AriaAttrs = RemovePrefixes<
  PickStartsWith<HtmlHTMLAttributes, "aria">,
  "aria-"
>;

declare global {
  namespace Cypress {
    interface Chainable {
      a11y(): void;

      getByRole(role: string): Chainable<JQuery<HTMLElement>>;

      getByAria<T extends keyof AriaAttrs>(
        property: T,
        value: AriaAttrs[T]
      ): Chainable<JQuery<HTMLElement>>;

      getByArias(properties: AriaAttrs): Chainable<JQuery<HTMLElement>>;

      shouldHaveAria<T extends keyof AriaAttrs>(
        property: T,
        value: AriaAttrs[T]
      ): Chainable<JQuery<HTMLElement>>;

      shouldHaveArias(properties: AriaAttrs): Chainable<JQuery<HTMLElement>>;
      shouldHaveRole(role: string): Chainable<JQuery<HTMLElement>>;

      assertDatePicker(
        id: string,
        command: "should.have.focus-on" | "should.have.selected",
        item?: number
      ): void;

      assertSelect(
        id: string,
        command:
          | "should.be.open"
          | "should.be.closed"
          | "should.have.focus-on"
          | "should.have.selected"
          | "should.not.have.selected",
        item?: string
      ): void;

      assertMenu(
        id: string,
        command:
          | "should.be.open"
          | "should.be.closed"
          | "should.have.focus-on"
          | "should.have.checked"
          | "should.not.have.checked",
        item?: string
      ): void;

      assertTabs(
        id: string,
        command:
          | "should.have.selected"
          | "should.not.have.selected"
          | "should.have.focus-on"
          | "should.have.panel-focused"
          | "should.have.panel-open"
          | "should.have.panel-closed"
          | "should.have.panel-removed",
        tab: string
      ): void;

      navigateMenu(id: string, path: string[]): Chainable<JQuery<HTMLElement>>;
    }
  }
}
