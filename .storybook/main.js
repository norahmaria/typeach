const path = require('path')

module.exports = {
  framework: '@storybook/vue3',
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  core: { builder: 'webpack5' },
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })

    // const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    // fileLoaderRule.exclude = /\.svg$/

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: ['@svgr/webpack', 'url-loader'],
    // })

    return config
  },
}
