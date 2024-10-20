import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import {
  componentRoute,
  isValidLinkRouteRecord,
  routeRecordToLink,
} from "./utils";

import Home from "../views/Home.vue";
import NotFoundView from "../views/404.vue";

import UserPreferences from "../pages/user-preference/UserPreference.docs.vue";
import UserGuides from "../pages/user-guides/UserGuides.docs.vue";
import Styling from "../pages/styling/Styling.docs.vue";

const componentRoutes: RouteRecordRaw[] = [
  {
    ...componentRoute("Dialog"),
    component: () => {
      return import("../../components/dialog/__docs__/Dialog.docs.vue");
    },
  },

  {
    ...componentRoute("Disclosure"),
    component: () => {
      return import("../../components/disclosure/__docs__/Disclosure.docs.vue");
    },
  },

  {
    ...componentRoute("Hierarchy Title"),
    component: () => {
      return import(
        "../../components/hierarchy-title/__docs__/HierarchyTitle.docs.vue"
      );
    },
  },

  {
    ...componentRoute("Menu"),
    component: () => {
      return import("../../components/menu/__docs__/Menu.docs.vue");
    },
  },

  {
    ...componentRoute("Progress"),
    component: () => {
      return import("../../components/progress/__docs__/Progress.docs.vue");
    },
  },

  {
    ...componentRoute("Tabs"),
    component: () => {
      return import("../../components/tabs/__docs__/Tabs.docs.vue");
    },
  },

  {
    ...componentRoute("Toast"),
    component: () => {
      return import("../../components/toast/__docs__/Toast.docs.vue");
    },
  },

  {
    ...componentRoute("Toggletip"),
    component: () => {
      return import("../../components/toggletip/__docs__/Toggletip.docs.vue");
    },
  },

  {
    ...componentRoute("Tooltip"),
    component: () =>
      import("../../components/tooltip/__docs__/Tooltip.docs.vue"),
  },

  {
    ...componentRoute("Tree"),
    component: () => {
      return import("../../components/tree/__docs__/Tree.docs.vue");
    },
  },

  /** @TODO */
  {
    ...componentRoute("Visually Hidden"),
    component: () => {
      return import(
        "../../components/visually-hidden/__docs__/VisuallyHidden.docs.vue"
      );
    },
  },
];

const inputComponentRoutes: RouteRecordRaw[] = [
  {
    ...componentRoute("Input"),
    component: () => {
      return import("../../components/inputs/input/__docs__/Input.docs.vue");
    },
  },

  {
    ...componentRoute("Checkbox"),
    component: () => {
      return import(
        "../../components/inputs/checkbox/__docs__/Checkbox.docs.vue"
      );
    },
  },

  {
    ...componentRoute("Date Picker"),
    component: () => {
      return import(
        "../../components/inputs/date-picker/__docs__/DatePicker.docs.vue"
      );
    },
  },

  {
    ...componentRoute("Radio"),
    component: () => {
      return import("../../components/inputs/radio/__docs__/Radio.docs.vue");
    },
  },

  {
    ...componentRoute("Switch"),
    component: () => {
      return import("../../components/inputs/switch/__docs__/Switch.docs.vue");
    },
  },

  {
    ...componentRoute("Select"),
    component: () => {
      return import("../../components/inputs/select/__docs__/Select.docs.vue");
    },
  },

  {
    ...componentRoute("Text Input"),
    component: () => {
      return import(
        "../../components/inputs/text-input/__docs__/TextInput.docs.vue"
      );
    },
  },
];

export const links = componentRoutes
  .filter(r => isValidLinkRouteRecord(r))
  .map(r => routeRecordToLink(r));

export const inputLinks = inputComponentRoutes
  .filter(r => isValidLinkRouteRecord(r))
  .map(r => routeRecordToLink(r));

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/styling",
      name: "styling",
      component: Styling,
    },
    {
      path: "/user-preferences",
      name: "user-preferences",
      component: UserPreferences,
    },

    {
      path: "/user-guides",
      name: "user-guides",
      component: UserGuides,
    },

    {
      path: "/input",
      children: [...inputComponentRoutes],
    },

    ...componentRoutes,

    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFoundView,
    },
  ],
});
