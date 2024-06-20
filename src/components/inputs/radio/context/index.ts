import type { ComputedRef, DeepReadonly, InjectionKey, Ref } from "vue";

export type RadioContext = {
  selected: ComputedRef<boolean>;
  id: DeepReadonly<Ref<string>>;
  onClick(): void;
};

export const RadioContextKey: InjectionKey<RadioContext> =
  Symbol("peachy-radio");

export type RadioGroupContext = {
  selected: DeepReadonly<Ref<string>>;
  setSelected(value: string): void;
  disabled: boolean;
  readOnly: boolean;
};

export const RadioGroupContextKey = Symbol("peachy-radio-group");
