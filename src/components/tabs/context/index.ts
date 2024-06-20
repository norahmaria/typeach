import type { DeepReadonly, InjectionKey, Ref } from "vue";

export interface TabsContext {
  tabs: Ref<string[]>;
  currentTab: Ref<string>;

  followFocus: Ref<boolean>;

  navigate(to: "next" | "previous"): void;
  addTab(tab: string): void;

  pause(): void;
  resume(): void;

  titleId: DeepReadonly<Ref<string | undefined>>;
  setTitleId(id: string): void;
}

export interface TabsListContext {
  onItemPointerEnter(event: PointerEvent): void;
}

export const TabsContextKey: InjectionKey<TabsContext> = Symbol("peachy-tabs");

export const TabsListContextKey: InjectionKey<TabsListContext> =
  Symbol("peachy-tabs-list");
