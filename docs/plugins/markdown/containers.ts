import type MarkdownIt from "markdown-it";

import type { RenderRule } from "markdown-it/lib/renderer.mjs";

import container from "markdown-it-container";

import { isOpeningTag } from "./utils";

export const containersPlugin = (md: MarkdownIt) => {
  const renderRule = (c: string) => render(c, md);

  md.use(container, "warning", { render: renderRule("warning") });
  md.use(container, "danger", { render: renderRule("danger") });
  md.use(container, "success", { render: renderRule("success") });
  md.use(container, "info", { render: renderRule("info") });
};

const render = (c: string, md: MarkdownIt): RenderRule => {
  return (tokens, index) => {
    const token = tokens[index];

    if (!token) {
      return "";
    }

    const info = token.info.trim().slice(c.length).trim();

    if (isOpeningTag(token)) {
      const title = md.renderInline(info);

      return `
        <div class="note note--${c}">
          <p class="note__title">
            ${title}
          </p>
        `;
    }

    return "</div>\n";
  };
};
