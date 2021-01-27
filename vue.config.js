const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,scss,sass}'],
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import '~/node_modules/element-plus/packages/theme-chalk/src/common/var';
          @import '@/assets/scss/config.variables';
        `,
      },
    },
  },
};
