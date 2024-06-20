import type { DeepReadonly, InjectionKey, Ref } from "vue";
import { useThrottleFn, useDebounceFn } from "@vueuse/core";

export const hidePopoverWithThrottle = useThrottleFn((target?: HTMLElement) => {
  target?.hidePopover();
}, 1000);

export const updatePopover = useDebounceFn((update: () => void) => {
  update();
}, 25);

export type PopoverContext = {
  hover: DeepReadonly<Ref<boolean>>;
  isOpen: DeepReadonly<Ref<boolean>>;

  targetId: DeepReadonly<Ref<string | undefined>>;
  target: Ref<HTMLElement | undefined>;
  trigger: Ref<HTMLElement | undefined>;

  setTargetId(id?: string): void;
  setTarget(element: HTMLElement | undefined): void;
  setTrigger(element: HTMLElement | undefined): void;

  expose: PopoverExpose;
};

export type PopoverExpose = {
  isOpen: DeepReadonly<Ref<boolean>>;
  targetId: DeepReadonly<Ref<string | undefined>>;

  hideAll(): void;
  hideChildren(): void;
  hideSiblings(): void;

  toggle(): void;
  show(): void;
  hide(): void;

  getTarget(): HTMLElement | undefined;
  getTrigger(): HTMLElement | undefined;
};

export type PopoverRootTarget = PopoverContext["target"];

export const PopoverContextKey: InjectionKey<PopoverContext> =
  Symbol("peachy-popover");

export const PopoverRootTargetKey: InjectionKey<PopoverRootTarget> = Symbol(
  "peachy-popover-root-target"
);
