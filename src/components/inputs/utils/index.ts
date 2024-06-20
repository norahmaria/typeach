export const isTextInput = (
  target: unknown
): target is HTMLInputElement | HTMLTextAreaElement => {
  return (
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
  );
};
