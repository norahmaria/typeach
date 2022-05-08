/// <reference types="cypress" />
import { startDevServer } from '@cypress/vite-dev-server'

const plugins: Cypress.PluginConfig = (on, config) => {
  on('dev-server:start', options => startDevServer({ options }))

  return config
}

export default plugins
