import type MarkdownIt from "markdown-it";

/**
 * Adds the ability to use `to:` as a prefix
 * for route names in links.
 *
 * @see https://github.com/martinheidegger/markdown-it-replace-link/tree/main
 */
export const linkPlugin = (md: MarkdownIt) => {
  md.core.ruler.after("inline", "vue-router", state => {
    state.tokens.forEach(blockToken => {
      if (blockToken.type === "inline" && blockToken.children) {
        blockToken.children
          .filter(t => ["link_open", "link_close"].includes(t.type))
          .forEach(t => {
            t.tag = "Link";

            const link = t.attrGet("href");

            if (link?.startsWith("to:")) {
              if (t.type === "link_open") {
                t.attrSet("page", link.replace(/^to:/, ""));
              }
            }
          });
      }
    });
  });
};
