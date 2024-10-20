/**
 * `token.nesting` is a number referring to the nature of the tag.
 *
 * - `+1` is a opening tag
 * - `+0` is self-closing tag
 * - `-1` is a closing tag
 *
 * @see https://github.com/markdown-it/markdown-it/blob/2e31d3430187d2eee1ba120c954783eebb93b4e8/lib/token.js#L44-L53
 */
export const isOpeningTag = (token: { nesting: -1 | 0 | 1 }) => {
  return token.nesting !== -1;
};
