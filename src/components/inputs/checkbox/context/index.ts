import type { DeepReadonly, Ref } from "vue";

export type CheckboxState = boolean | "indeterminate";

export type CheckboxContext = {
  state: DeepReadonly<Ref<CheckboxState>>;
  onClick(): void;
};

export type CheckboxChild = {
  id: string;
  state: CheckboxState;
  resetValue: CheckboxState;
  disabled: boolean;
  readOnly: boolean;
  set(value: CheckboxState | "reset"): void;
  save(): void;
};

export type CheckboxParent = {
  add(child: CheckboxChild): void;
  remove(id: string): void;
  update(id: string, state: CheckboxState, resetValue: CheckboxState): void;
  save(): void;
  children: Ref<CheckboxChild[]>;
  state: Ref<CheckboxState>;
};

export const CheckboxHierarchyKey = Symbol("peachy-checkbox-group");

export const CheckboxContextKey = Symbol("peachy-checkbox");
