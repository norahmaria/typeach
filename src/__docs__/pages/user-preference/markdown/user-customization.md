### Custom preferences for your site

If any of the customization options for your site happen to overlap with an existing system or browser preference - it's recommended that the default respects the existing preference.

#### Font family

Right now there is no way to check if a user has a preferred font family even though _most_ browsers have font related settings (except Safari 😔). _If you know a way to determine this, [please let me know](https://github.com/norahmaria/typeach/issues)_.

[Chrome](chrome://settings/fonts) and [Firefox](about:preferences#general) provide options for the user to select a default font while also picking a separate sans font, sans-serif font and a monospace font.

If you provide options for fonts - one of those should be to respect their browser settings - meaning limit `font-family` to either `sans`, `sans-serif` or `monospace`.

##### Open Dyslexic font

If you want to offer users a font that might make it easier for people with dyslexia to read - [Open Dyslexic](https://opendyslexic.org) seems to have a lot of positive feedback.

##### System fonts?

::: warning

Some sites go the route of using the system fonts - which is a pretty safe choice to ensure your site is using a _generally_ accessible font.

However this uses the _defaults_ of the operating system - even if a user has changed their preference on their system or in their browser.
:::

```css
body {
  /* prettier-ignore */
  font-family: 
    -apple-system, 
    BlinkMacSystemFont, 
    "Segoe UI", 
    "Roboto",
    "Helvetica Neue", 
    "Arial",
    sans-serif;
}
```
