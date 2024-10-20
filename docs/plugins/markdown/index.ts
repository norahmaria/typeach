import type { Plugin } from "vite";

import { sfcPlugin } from "@mdit-vue/plugin-sfc";
import { componentPlugin } from "@mdit-vue/plugin-component";

import markdown from "markdown-it";
import type { MarkdownItEnv } from "@mdit-vue/types";

import { cleanUrl } from "../utils";

import { containersPlugin } from "./containers";
import { linkPlugin } from "./link";

export const markdownComponents = (): Plugin => {
  const md = markdown({
    html: true,

    highlight(str, lang): string {
      return `<highlightjs language="${lang}" code="${md.utils.escapeHtml(str.trim())}" tabindex="0"></highlightjs>`;
    },
  });

  md.use(containersPlugin);
  md.use(linkPlugin);
  md.use(sfcPlugin);
  md.use(componentPlugin);

  return {
    name: "docs",
    enforce: "pre",

    transform(code, id) {
      if (id.endsWith(".md")) {
        const env: MarkdownItEnv = {
          realPath: cleanUrl(id),
        };

        const html = md.render(code, env);

        const script = env.sfcBlocks?.scriptSetup?.content ?? "";

        return `<template>${html}</template>${script}`;
      }
    },
  };
};
