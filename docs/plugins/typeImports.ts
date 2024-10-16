import path from "node:path";
import url from "node:url";

import type { Plugin } from "vite";

import {
  createChecker,
  type EventMeta,
  type PropertyMeta,
} from "vue-component-meta";

import MarkdownIt from "markdown-it";

import { cleanUrl } from "./utils";

const expose = <T>(content: T) => `export default ${JSON.stringify(content)}`;

export const typeImports = (): Plugin => {
  const md = MarkdownIt({
    html: true,
    highlight(str, lang): string {
      return `<highlightjs language="${lang}" code="${md.utils.escapeHtml(str.trim())}" tabindex="0"></highlightjs>`;
    },
  });

  const dirname = url.fileURLToPath(new URL("../../", import.meta.url));

  const typeChecker = createChecker(path.join(dirname, "tsconfig.app.json"));

  const typesRegex = /\.vue\?types$/;

  return {
    name: "type-imports",
    enforce: "pre",

    load(id) {
      if (id.match(typesRegex)) {
        try {
          const types = typeChecker.getComponentMeta(cleanUrl(id));

          const findDefault = ({ tags, default: d }: PropertyMeta) => {
            return tags.find(tag => tag.name === "Default")?.text ?? d;
          };

          const findFallbackDescription = ({
            tags,
            description: d,
          }: EventMeta) => {
            return tags.find(tag => tag.name === "Description")?.text ?? d;
          };

          const props = types.props
            .filter(p => !p.global)
            .filter(p => !(p.name === "id" && !p.required))
            .map(p => ({
              ...p,
              description: md.render(p.description),
              default: findDefault(p),
            }));

          const events = types.events.map(e => ({
            ...e,
            description: md.render(findFallbackDescription(e)),
          }));

          const slots = types.slots.map(s => ({
            ...s,
            description: md.render(s.description),
          }));

          return expose({
            props,
            events,
            slots,
          });
        } catch (e) {
          return expose(undefined);
        }
      }
    },

    transform(code, id) {
      if ([typesRegex].some(regex => id.match(regex))) {
        return `<script>${code}</script>`;
      }
    },
  };
};
