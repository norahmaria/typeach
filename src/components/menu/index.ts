import Menu from "./Menu.vue";
import List from "./MenuList.vue";
import Target from "./MenuTarget.vue";
import Trigger from "./MenuTrigger.vue";
import Item from "./MenuItem.vue";
import CheckboxItem from "./MenuCheckboxItem.vue";
import RadioItem from "./MenuRadioItem.vue";
import RadioGroup from "./MenuRadioGroup.vue";
import Label from "./MenuLabel.vue";
import Separator from "./MenuSeparator.vue";

export type { MenuTriggerProps } from "./MenuTrigger.vue";
export type { MenuCheckboxItemProps } from "./MenuCheckboxItem.vue";
export type { MenuRadioGroupProps } from "./MenuRadioGroup.vue";
export type { MenuRadioItemProps } from "./MenuRadioItem.vue";
export type { MenuSeparatorProps } from "./MenuSeparator.vue";

export const PeachyMenu = {
  Menu,
  List,
  Target,
  Trigger,
  Item,
  CheckboxItem,
  RadioItem,
  RadioGroup,
  Label,
  Separator,
};
