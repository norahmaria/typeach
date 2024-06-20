// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";

import DefaultTheme from "vitepress/theme";
import "./style.css";

import ComponentPreview from "../../ComponentPreview.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {});
  },
  enhanceApp({ app, router, siteData }) {
    app.component("ComponentPreview", ComponentPreview);
  },
} satisfies Theme;
