import Input from "./SelectInput.vue";
import Trigger from "./SelectTrigger.vue";
import Target from "./SelectTarget.vue";
import List from "./SelectList.vue";
import Label from "./SelectLabel.vue";
import Item from "./SelectItem.vue";
import Indicator from "./SelectIndicator.vue";
import Separator from "./SelectSeparator.vue";

export type { SelectProps } from "./SelectInput.vue";
export type { SelectItemProps } from "./SelectItem.vue";
export type { SelectSeparatorProps } from "./SelectSeparator.vue";
export type { SelectTriggerProps } from "./SelectTrigger.vue";

export const PeachySelect = {
  Input,
  Trigger,
  Target,
  List,
  Label,
  Item,
  Indicator,
  Separator,
};
