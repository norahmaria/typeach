import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  title: "Typeach",
  description: "Unstyled component library",
  appearance: "dark",
  base: "/typeach/",
  cleanUrls: true,

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: "https://static-00.iconduck.com/assets.00/peach-emoji-emoji-492x512-vb61turt.png",

    nav: [
      { text: "Getting started", link: "/getting-started" },
      { text: "Components", link: "/components/dialog" },
    ],

    sidebar: [
      {
        text: "Overview",
        items: [
          { text: "Getting started", link: "/getting-started" },
          { text: "Info", link: "/info" },
          { text: "Accessibility", link: "/accessibility" },
        ],
      },
      {
        text: "Components",
        collapsed: false,
        base: "/components",
        items: [
          { text: "Dialog", link: "/dialog" },
          { text: "Disclosure", link: "/disclosure" },
          {
            text: "Hierarchy Title",
            link: "/hierarchy-title",
          },
          { text: "Menu", link: "/menu" },
          { text: "Progress", link: "/progress" },
          { text: "Tabs", link: "/tabs" },
          { text: "Toast", link: "/toast" },
          { text: "Toggletip", link: "/toggletip" },
          { text: "Tooltip", link: "/tooltip" },

          {
            text: "Inputs",
            collapsed: false,
            items: [
              { text: "Input", link: "/input" },
              { text: "Checkbox", link: "/checkbox" },
              { text: "Date Picker", link: "/date-picker" },
              { text: "Radio", link: "/radio" },
              { text: "Switch", link: "/switch" },
              { text: "Select", link: "/select" },
              { text: "Text Input", link: "/text-input" },
            ],
          },
        ],
      },
      {
        text: "Utilities",
        collapsed: false,
        items: [
          { text: "Popover Component", link: "/components/popover" },
          {
            text: "Visually Hidden Component",
            link: "/components/visually-hidden",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/norahmaria/typeach" },
    ],

    search: {
      provider: "local",
    },
  },

  vite: {
    resolve: {
      alias: { "@": fileURLToPath(new URL("../../src", import.meta.url)) },
    },
  },
});
