import type { DeepReadonly, InjectionKey, Ref } from "vue";

export type DisclosureContext = {
  isOpen: Ref<boolean>;
  toggle(): void;

  triggerId: DeepReadonly<Ref<string | undefined>>;
  setTriggerId(id: string): void;

  targetId: DeepReadonly<Ref<string | undefined>>;
  setTargetId(id: string): void;
};

export const DisclosureContextKey: InjectionKey<DisclosureContext> =
  Symbol("peachy-disclosure");
