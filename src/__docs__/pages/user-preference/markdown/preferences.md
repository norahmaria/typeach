### Respecting system preferences

There's a couple options that the different operating systems provides - that's easily available for us to use with [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media).

I think we're all familiar with them in CSS - but you can also use media queries [in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), and directly in your HTML with the [media attribute](https://www.w3schools.com/tags/att_a_media.asp).

```js
const isMediaMatch = (media: string): boolean => {
  return window.matchMedia(media).matches;
};

const userPreferences = {
  highContrast: isMediaMatch("(prefers-contrast: more)"),
  reduceMotion: isMediaMatch("(prefers-reduced-motion: reduce)"),
  darkMode: isMediaMatch("(prefers-color-scheme: dark)"),
  reduceTransparency: isMediaMatch("(prefers-reduced-transparency: reduce)"),
}
```

#### Contrast

::: info
You can enable high contrast on [Windows](https://support.microsoft.com/en-us/windows/turn-high-contrast-mode-on-or-off-in-windows-909e9d89-a0f9-a3a9-b993-7a6dcee85025) or [Safari](https://support.apple.com/lv-lv/guide/mac-help/unac089/mac).
:::

[prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) determines if someone **prefers `more` or `less` contrast** (or have a `custom` contrast level setup).

#### Motion

::: info
You can reduce motions on [Windows](https://support.microsoft.com/en-us/office/turn-off-office-animations-9ee5c4d2-d144-4fd2-b670-22cef9fa025a#:~:text=in%20Windows%2010-,Open%20the%20Ease%20of%20Access%20Center%20by%20pressing%20the%20Windows,Close%20the%20Settings%20window.) or [Safari](https://support.apple.com/en-gb/guide/mac-help/mchlc03f57a1/mac).
:::

[prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) determines if someone **prefers us to `reduce` motions** - meaning they want transitions and animations to be minimal or completely avoided.

You should make transitions instant if a user prefers reduced motion.

```css
/**
  * The short durations means JavaScript
  * that relies on events still works.
  */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

You can also replace moving images with a static alternative.

```html
<picture>
  <source srcset="/image.png" media="(prefers-reduced-motion: reduce)" />
  <img src="/moving-image.gif" />
</picture>
```

#### Color Scheme (dark vs. light)

[prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) determines if someone **prefers a `dark` or `light` theme**.

You can provide different images for dark and light mode.

```html
<picture>
  <source srcset="/dark-image.png" media="(prefers-color-scheme: dark)" />
  <img src="/light-image.png" />
</picture>
```

#### Transparency (_\*cough\*_ glassmorphism)

::: info
_This media query is only available in Chrome & Edge,_ but you can reduce transparency on both [Windows](https://answers.microsoft.com/en-us/msteams/forum/all/transparency-effects/8a570bcf-e3c9-42cc-96e2-dcdc1a17d76e) or [Safari](https://support.apple.com/en-qa/guide/mac-help/unac089/mac).
:::

[prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) determines if someone prefers **`more` or `less` transparency**.

#### Font size

Font size is a _relatively_ simple thing to respect - use _relative_ units (`rem`) **and avoid overriding the `html` element's font size**.

::: success
For a more thorough explanation on the topic - I love this great article - ["The Surprising Truth About Pixels and Accessibility"](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/) by [Josh Comeau](https://www.joshwcomeau.com).
:::
