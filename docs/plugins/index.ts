import type { Plugin } from "vite";

import { markdownComponents } from "./markdown";
import { typeImports } from "./typeImports";

export const plugins = (): Plugin[] => [markdownComponents(), typeImports()];
