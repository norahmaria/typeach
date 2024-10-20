import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";

import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import pluginCypress from "eslint-plugin-cypress";

import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

const ATTRIBUTES_ORDER = [
  "LIST_RENDERING",
  "CONDITIONALS",
  "RENDER_MODIFIERS",
  "UNIQUE",
  "DEFINITION",
  "TWO_WAY_BINDING",
  "SLOT",
  "GLOBAL",
  "OTHER_DIRECTIVES",
  "ATTR_DYNAMIC",
  "ATTR_SHORTHAND_BOOL",
  "ATTR_STATIC",
  "EVENTS",
  "CONTENT",
];

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  {
    plugins: {
      cypress: pluginCypress.configs.recommended,
    },
  },

  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  ...pluginVue.configs["flat/strongly-recommended"],

  ...pluginVueA11y.configs["flat/recommended"],

  ...vueTsEslintConfig(),
  skipFormatting,

  {
    files: ["**/*.vue", "**/*.ts"],

    ignores: [
      "*.log",
      "yarn-error.log*",
      "logs",
      "*.local",
      ".DS_Store",
      "node_modules",
      "dist",
      "cypress/screenshots",
      "cypress/downloads",
    ],

    rules: {
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      complexity: ["error", 10],
      "default-case-last": "error",
      "consistent-return": "off",
      "array-callback-return": "off",
      "guard-for-in": "off",

      "prefer-destructuring": [
        "error",
        {
          object: true,
          array: true,
        },
      ],

      "no-multiple-empty-lines": "error",
      "no-plusplus": "off",
      "no-shadow": "off",
      "no-use-before-define": "off",
      "no-restricted-syntax": "off",
      "no-continue": "off",
      "no-underscore-dangle": "off",
      "no-param-reassign": "off",
      "no-useless-constructor": "off",
      "no-empty-function": "off",

      "no-else-return": [
        "warn",
        {
          allowElseIf: true,
        },
      ],

      "no-console": [
        "warn",
        {
          allow: ["error", "assert", "warn"],
        },
      ],

      "vue/comma-dangle": ["warn", "only-multiline"],
      "vue/multi-word-component-names": "off",

      "vue/attributes-order": [
        "error",
        {
          order: ATTRIBUTES_ORDER,
          alphabetical: false,
        },
      ],

      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/no-use-before-define": "off",

      // "@typescript-eslint/consistent-type-imports": [
      //   "error",
      //   {
      //     prefer: "type-imports",
      //     fixStyle: "inline-type-imports",
      //   },
      // ],
    },
  },
];
