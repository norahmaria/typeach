export const isHtmlElement = (
  element?: Element | Node | null | EventTarget
): element is HTMLElement => {
  if (!element || !(element instanceof Node)) {
    return false;
  }

  return element.nodeType === Node.ELEMENT_NODE;
};

export const findRelativeElement = (
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

export const findEdgeElementFromQuery = (
  by: "last" | "first",
  selector: string,
  container?: Element | null,
  filter?: (element: HTMLElement) => boolean
) => {
  const items = container?.querySelectorAll(selector) ?? [];

  const arrayOfItems = Array.from(items)
    .filter((element): element is HTMLElement => isHtmlElement(element))
    .filter(element => !filter || filter?.(element));

  if (by === "last") {
    return arrayOfItems[items.length - 1];
  }

  return arrayOfItems[0];
};

export const findRelativeElementFromQuery = (
  by: "next" | "previous",
  selector: string,
  container?: Element | null,
  start?: Element | null,
  filter?: (element: HTMLElement) => boolean
) => {
  if (!start) {
    return;
  }

  const items = container?.querySelectorAll(selector);

  const arrayOfItems = Array.from(items ?? [])
    .filter((element): element is HTMLElement => isHtmlElement(element))
    .filter(element => !filter || filter?.(element));

  const currentItemIndex = arrayOfItems.findIndex(item => {
    return item.isSameNode(start!);
  });

  const nextNodeIndex = currentItemIndex + (by === "next" ? 1 : -1);

  const nextNode = arrayOfItems[nextNodeIndex];

  return nextNode;
};
