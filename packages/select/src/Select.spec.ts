import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'

import SelectVue from './Select.vue'

test('displays message', () => {
  const wrapper = mount(SelectVue, {
    propsData: {
      title: 'Hello world',
      snowflake: 'Hello snow',
    },
  })

  expect(wrapper.text()).toContain('Hello world')
})
