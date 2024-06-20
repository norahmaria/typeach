import { useDebounceFn } from "@vueuse/core";
import type { DeepReadonly, InjectionKey, Ref } from "vue";

export type DialogContext = {
  isOpen?: DeepReadonly<Ref<boolean>>;
  isAboutToOpen?: DeepReadonly<Ref<boolean>>;
  open(): void;
  close(): void;

  targetId?: DeepReadonly<Ref<string | undefined>>;
  setTargetId(id: string): void;

  titleId?: DeepReadonly<Ref<string | undefined>>;
  setTitleId(id: string): void;

  descriptionId?: DeepReadonly<Ref<string | undefined>>;
  setDescriptionId(id: string): void;

  trigger: Ref<HTMLButtonElement | undefined>;
  setTrigger(trigger: HTMLButtonElement | undefined): void;
};

export const DialogContextKey: InjectionKey<DialogContext> =
  Symbol("peachy-dialog");

export const updateDialog = useDebounceFn((update: () => void) => {
  update();
}, 25);
