import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    specPattern: 'src/**/*.cy.ts',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
