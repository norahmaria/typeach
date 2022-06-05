export const parameters = {
  actions: { argTypesRegex: '^@[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },

    expanded: true,
  },

  layout: 'centered',
}
