import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'

import SelectVue from './TypeachSelect.vue'

test('Renders text', () => {
  const wrapper = mount(SelectVue, {
    propsData: {
      title: 'Select Example',
      id: '1',
    },
  })

  expect(wrapper.text()).toContain('Select Example')
})
