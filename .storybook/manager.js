import { addons } from '@storybook/addons'
import theme from './theme'

addons.setConfig({
  theme,
  showNav: false,
  showPanel: false,
  selectedPanel: 'Button',
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    eject: { hidden: true },
    copy: { hidden: true },
    grid: { hidden: true },
    fullscreen: { hidden: true },
  },
})
