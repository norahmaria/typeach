import type { DeepReadonly, InjectionKey, Ref } from "vue";

import type { PopoverExpose } from "@/components/popover";
import type { useKeyboardList } from "@/hooks";

export type MenuContext = {
  isRoot: boolean;

  popover?: Ref<PopoverExpose | undefined>;
  keyboardList: ReturnType<typeof useKeyboardList>;

  setList(element?: HTMLUListElement): void;
};

export type MenuRadioGroupContext<T> = {
  value: DeepReadonly<Ref<T>>;
  onRadioClick(value: T): void;
};

export const MenuContextKey: InjectionKey<MenuContext> = Symbol("peachy-menu");

export const MenuRadioGroupContextKey: InjectionKey<
  MenuRadioGroupContext<any>
> = Symbol("peachy-menu-radio");
