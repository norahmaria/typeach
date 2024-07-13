export const withModifierKey = (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

export * from "./dom";
export * from "./string";
