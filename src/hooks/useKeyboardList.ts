import { useTimeout } from "@vueuse/core";
import { ref, watch, unref, onMounted, type Ref } from "vue";

export type UseKeyboardListOptions = {
  /**
   * The orientation of the list. This is used to
   * determine which arrow keys should be used to
   * navigate the list.
   *
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * If the list should go back to the first
   * item when on the last item, and vise-versa.
   *
   * If false, the list will stop at an item
   * when there are no more items in the direction
   * of the arrow key.
   *
   * @default false
   */
  loop?: boolean;

  /**
   * If the list should support type ahead.
   *
   * @default true
   */
  typeAhead?: boolean;

  /**
   * If the active element should be focused using
   * `element.focus()` or if the element should just
   * get an attribute for `data-focus="true"` instead.
   *
   * If you wish to make more changes to the active
   * element you can use a watcher on the exposed `activeItem`.
   *
   * ```ts
   * watch(activeItem, (newActiveItem, oldActiveItem) => {
   *  oldActiveItem?.removeAttribute("active");
   *  newActiveItem?.setAttribute("active", "true");
   * });
   * ```
   *
   * @default false
   */
  focus?: boolean;

  /**
   * When list is set to vertical orientation, this
   * runs when the `ArrowLeft` key is
   * pressed on an item.
   *
   * If set to horizontal, it triggers
   * on `ArrowUp`.
   */
  onBackArrow?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * When list is set to vertical orientation, this
   * runs when runs when the `ArrowRight` key is
   * pressed on an item.
   *
   * If set to horizontal, it triggers
   * on `ArrowDown`.
   */
  onForwardArrow?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * Runs when `Escape` is pressed.
   */
  onEscape?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * Runs when `Tab` is pressed.
   *
   * The default behavior of `Tab` runs,
   * as there is no `event.preventDefault()`
   * before this callback.
   */
  onTab?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => void | Promise<void>;

  /**
   * Runs when no action is triggered.
   */
  onUnknownKey?: (
    element: HTMLElement | undefined,
    navigate: NavigateFunction,
    event: KeyboardEvent
  ) => any | Promise<any>;

  /**
   * Runs when the list has reached the edge,
   * and an arrow key is pressed, but loop
   * is set to `false`.
   */
  onNoEdge?: (
    direction: "next" | "previous",
    navigate: NavigateFunction
  ) => void;

  /**
   * Filter items to include in keyboard navigation.
   * Returning `false` will exclude the element.
   */
  filter?: (element: HTMLElement) => boolean;
};

export interface UseKeyboardList {
  /**
   * The currently focused element.
   */
  activeItem: Ref<HTMLElement | undefined>;

  /**
   * Helper function to change
   * active item relatively.
   */
  navigate: NavigateFunction;

  /**
   * Force focus the active item.
   */
  refocus: () => Promise<void>;

  /**
   * Force click the active item.
   */
  click: () => void;

  /**
   * Manually activate typeahead.
   */
  type: (key: string) => void;

  /**
   * The `@keydown` listener to attach to the list.
   */
  onKeyDown: (event: KeyboardEvent) => void;

  /**
   * The `@focusin` listener to attach to the list.
   */
  onFocusIn: (event: FocusEvent) => void;

  /**
   * The `@pointerenter` listener to attach to every
   * focusable item inside the list, if you want
   * keyboard navigation and hover to be in sync.
   */
  onItemPointerEnter: (event: PointerEvent) => void;
}

export type NavigateFunction = (
  to?: "next" | "previous" | "first" | "last" | HTMLElement
) => Promise<void>;

/* prettier-ignore */
type KeyMapper = Record<string, (
  element: HTMLElement | undefined,
  navigate: NavigateFunction,
  event: KeyboardEvent
) => void>;

export const isHtmlElement = (
  element?: Element | Node | null | EventTarget
): element is HTMLElement => {
  if (!element || !(element instanceof Node)) {
    return false;
  }

  return element.nodeType === Node.ELEMENT_NODE;
};

const withModifierKey = (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

export const isPrintableCharacter = (key: string) =>
  key.length === 1 && key !== " ";

const isRepeatingCharacter = (string: string, newCharacter: string) =>
  string.length > 1 && string.split("").every(char => char === newCharacter);

const findRelativeElement = (
  by: "next" | "previous",
  start?: Element | null,
  filter?: (element: HTMLElement) => boolean
) => {
  if (!start) {
    return;
  }

  let sibling: Element | null | undefined = start?.[`${by}ElementSibling`];

  const invalidElement = (element?: Element | null) => {
    return element === null || element === undefined;
  };

  const foundRelativeItem = (element?: Element | null) => {
    if (!isHtmlElement(element)) {
      return false;
    }

    if (filter) {
      return filter(element);
    }

    return true;
  };

  while (!foundRelativeItem(sibling) && !invalidElement(sibling)) {
    sibling = sibling?.[`${by}ElementSibling`];
  }

  return sibling;
};

export const findEdgeElement = (
  by: "last" | "first",
  container?: Element | null,
  filter?: (element: HTMLElement) => boolean
): HTMLElement | undefined => {
  if (!container) {
    return;
  }

  let edge: Element | null | undefined = container?.[`${by}ElementChild`];

  /* prettier-ignore */
  const selector = by === "last" ? "previousElementSibling" : "nextElementSibling";

  const invalidElement = (element?: Element | null) => {
    return element === null || element === undefined;
  };

  const foundRelativeItem = (element?: Element | null) => {
    if (!isHtmlElement(element)) {
      return false;
    }

    if (filter) {
      return filter(element);
    }

    return true;
  };

  while (!foundRelativeItem(edge) && !invalidElement(edge)) {
    edge = edge?.[selector];
  }

  return edge as HTMLElement;
};

/**
 * @TODO Add support for `PageUp` and `PageDown` keys.
 */
/* eslint-disable-next-line complexity */
export const useKeyboardList = (
  list: Ref<HTMLElement | undefined | null> | HTMLElement | undefined | null,
  options: UseKeyboardListOptions = {}
): UseKeyboardList => {
  const {
    orientation = "vertical",
    loop = false,
    typeAhead = true,
    focus = true,

    onBackArrow,
    onForwardArrow,
    onEscape,
    onTab,
    onUnknownKey,
  } = options;

  const activeItem = ref<HTMLElement>();

  const search = ref("");

  const repeatingSearchTimeout = useTimeout(500, {
    controls: true,
    callback() {
      if (typeAhead) {
        search.value = "";
      }
    },
  });

  watch(activeItem, () => refocus());

  const findRelativeElementInList = (by: "next" | "previous") => {
    return findRelativeElement(by, activeItem.value, options.filter);
  };

  const findEdgeElementInList = (by: "first" | "last") => {
    return findEdgeElement(by, unref(list), options.filter);
  };

  const next = () => {
    const nextItem = findRelativeElementInList("next");

    if (isHtmlElement(nextItem)) {
      activeItem.value = nextItem;
    } else if (loop) {
      first();
    } else {
      options.onNoEdge?.("next", navigate);
    }
  };

  const previous = () => {
    const prevItem = findRelativeElementInList("previous");

    if (isHtmlElement(prevItem)) {
      activeItem.value = prevItem;
    } else if (loop) {
      last();
    } else {
      options.onNoEdge?.("previous", navigate);
    }
  };

  const first = () => {
    const firstItem = findEdgeElementInList("first");

    if (isHtmlElement(firstItem)) {
      activeItem.value = firstItem;
    }
  };

  const last = () => {
    const lastItem = findEdgeElementInList("last");

    if (isHtmlElement(lastItem)) {
      activeItem.value = lastItem;
    }
  };

  const refocus = async () => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        if (focus) {
          activeItem.value?.focus();
        } else {
          const lastActiveItem = activeItem.value;

          activeItem.value = undefined;
          activeItem.value = lastActiveItem;
        }

        resolve();
      }, 0);
    });
  };

  const navigate: NavigateFunction = async to => {
    switch (to) {
      case "next":
        next();
        break;

      case "previous":
        previous();
        break;

      case "first":
        first();
        break;

      case "last":
        last();
        break;

      default:
        activeItem.value = to;
    }

    return refocus();
  };

  const click = () => {
    activeItem.value?.click();
  };

  const type = (key: string) => {
    if (repeatingSearchTimeout.isPending.value) {
      repeatingSearchTimeout.stop();
    }

    const character = key.toLowerCase();

    search.value += character;

    const isRepeating = isRepeatingCharacter(search.value, character);

    const matches = Array.from(unref(list)?.children ?? [])
      .filter((element): element is HTMLElement => isHtmlElement(element))
      .filter(element => {
        const text = element.textContent?.trim().toLowerCase();

        if (isRepeating) {
          return text?.startsWith(character);
        }

        return text?.startsWith(search.value);
      });

    const currentIndex = matches.findIndex(element =>
      activeItem.value?.isSameNode(element)
    );

    const next = matches[currentIndex + 1];

    if (next) {
      activeItem.value = next;
    } else {
      /* eslint-disable-next-line prefer-destructuring */
      activeItem.value = matches[0];
    }

    repeatingSearchTimeout.start();
  };

  const Keys: KeyMapper = {
    [orientation === "vertical" ? "ArrowDown" : "ArrowRight"]: next,
    [orientation === "vertical" ? "ArrowUp" : "ArrowLeft"]: previous,

    Enter: click,
    " ": click,

    Home: first,
    End: last,

    ...(onBackArrow && {
      [orientation === "vertical" ? "ArrowLeft" : "ArrowUp"]: onBackArrow,
    }),

    ...(onForwardArrow && {
      [orientation === "vertical" ? "ArrowRight" : "ArrowDown"]: onForwardArrow,
    }),

    ...(onEscape && {
      Escape: onEscape,
    }),

    ...(onTab && {
      Tab: onTab,
    }),
  };

  onMounted(() => {
    const currentList = unref(list);

    if (!currentList || !focus) {
      return;
    }
  });

  return {
    activeItem,

    navigate,
    refocus,
    click,
    type,

    onKeyDown(event: KeyboardEvent) {
      if (!withModifierKey(event) || (event.shiftKey && event.key === "Tab")) {
        event.stopPropagation();

        const action = Keys[event.key];

        if (action) {
          if (event.key !== "Tab") {
            event.preventDefault();
          }

          return action(activeItem.value, navigate, event);
        }

        if (typeAhead && isPrintableCharacter(event.key)) {
          // event.preventDefault();

          return type(event.key);
        }
      }

      onUnknownKey?.(activeItem.value, navigate, event);
    },

    onFocusIn(event: FocusEvent) {
      const currentList = unref(list);

      if (!currentList || !focus) {
        return;
      }

      if (!isHtmlElement(event.target)) {
        return;
      }

      if (event.target.parentElement?.isEqualNode(currentList)) {
        activeItem.value = event.target;
      }
    },

    onItemPointerEnter(event: PointerEvent) {
      const currentList = unref(list);

      if (!currentList || !isHtmlElement(event.target)) {
        return;
      }

      if (event.target.parentElement?.isEqualNode(currentList)) {
        activeItem.value = event.target;
      }
    },
  };
};
