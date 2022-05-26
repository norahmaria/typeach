module.exports = {
  root: true,

  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },

  plugins: ['@typescript-eslint', 'prettier'],

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:monorepo/recommended',
    '@vue/airbnb',
    '@vue/typescript',
    'prettier',
    'plugin:storybook/recommended',
  ],

  rules: {
    'prettier/prettier': ['error'],

    semi: ['error', 'never'],
    curly: ['error', 'multi-line'],

    'operator-linebreak': ['error', 'after'],
    'arrow-parens': 'off',

    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],

    'linebreak-style': 'off',
    'comma-dangle': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    // https://github.com/eslint/eslint/issues/10589
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    'no-continue': 'off',
    'no-else-return': 'off',
    'no-underscore-dangle': 'off',
    'no-console': [
      'warn',
      {
        allow: ['error', 'assert'],
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-shadow': 'error',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
      },
    ],

    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // Vue accessibility rules
    'vuejs-accessibility/click-events-have-key-events': 'warn',
    'vuejs-accessibility/mouse-events-have-key-events': 'warn',
    'vuejs-accessibility/form-control-has-label': 'warn',
    'vuejs-accessibility/label-has-for': 'warn',
    'vuejs-accessibility/alt-text': 'warn',
    'vuejs-accessibility/no-autofocus': 'warn',
    'vuejs-accessibility/heading-has-content': 'warn',

    'vue/no-mutating-props': 'warn',
    'vue/no-setup-props-destructure': 'warn',
    'vue/multi-word-component-names': 'warn',

    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],

    'vue/v-slot-style': [
      'error',
      {
        atComponent: 'v-slot',
        default: 'v-slot',
        named: 'longform',
      },
    ],
  },

  parser: '@typescript-eslint/parser',

  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
}
