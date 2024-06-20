import Popover from "./Popover.vue";
import Target from "./PopoverTarget.vue";
import Trigger from "./PopoverTrigger.vue";

export type { PopoverProps } from "./Popover.vue";
export type { PopoverTargetProps } from "./PopoverTarget.vue";
export type { PopoverTriggerProps } from "./PopoverTrigger.vue";

export type { PopoverExpose } from "./context";

export const PeachyPopover = {
  Popover,
  Target,
  Trigger,
};
