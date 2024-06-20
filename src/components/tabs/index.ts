import Tabs from "./Tabs.vue";
import List from "./TabsList.vue";
import ListItem from "./TabsListItem.vue";
import Panel from "./TabsPanel.vue";
import Title from "./TabsTitle.vue";
import IntervalController from "./TabsIntervalController.vue";
import NavigationButton from "./TabsNavigationButton.vue";

export type { TabsProps } from "./Tabs.vue";
export type { TabsListProps } from "./TabsList.vue";
export type { TabsListItemProps } from "./TabsListItem.vue";
export type { TabsPanelProps } from "./TabsPanel.vue";
export type { TabsNavigationButtonProps } from "./TabsNavigationButton.vue";

export const PeachyTabs = {
  Tabs,
  List,
  ListItem,
  Panel,
  Title,
  IntervalController,
  NavigationButton,
};
