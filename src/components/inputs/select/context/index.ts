import type { ComputedRef, DeepReadonly, InjectionKey, Ref } from "vue";

import type { PopoverExpose } from "@/components/popover";
import type { UseListBox } from "@/hooks";

export interface SelectContext {
  readonly: DeepReadonly<Ref<boolean>>;

  popover?: Ref<PopoverExpose | undefined>;
  listBox: UseListBox;

  activeDescendantId: DeepReadonly<Ref<string | undefined>>;
  multiSelect: DeepReadonly<Ref<boolean>>;

  selectedIds: DeepReadonly<Ref<string[]>>;
  setSelectedIds(ids: string[]): void;

  setList(element?: HTMLDivElement): void;
  setTriggerId(id: string): void;
}

export interface SelectItemContext {
  selected: ComputedRef<boolean>;
}

export const SelectContextKey: InjectionKey<SelectContext> =
  Symbol("peachy-select");

export const SelectItemContextKey: InjectionKey<SelectItemContext> =
  Symbol("peachy-select-item");
