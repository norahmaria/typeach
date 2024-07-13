export const isPrintableCharacter = (key: string) =>
  key.length === 1 && key !== " " && key !== "*";

export const isRepeatingCharacter = (string: string, newCharacter: string) =>
  string.length > 1 && string.split("").every(char => char === newCharacter);
