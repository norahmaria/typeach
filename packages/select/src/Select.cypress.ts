import { mount } from '@cypress/vue'
import NmSelect from './Nm-Select.vue'

describe('My First Test', () => {
  it('Does not do much!', () => {
    mount(NmSelect, {
      propsData: {
        snowflake: 'snowflakes',
        title: 'hellotitle',
      },
    })

    expect(true).to.equal(true)
    cy.get('h2').should('have.text', 'hellotitle')
  })
})
