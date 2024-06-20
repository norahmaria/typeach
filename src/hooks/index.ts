import { nanoid } from "nanoid";

export * from "./useBemClasses";
export * from "./useInput";
export * from "./useKeyboardList";
export * from "./useListBox";

export const createRandomId = () => `i${nanoid()}`;
