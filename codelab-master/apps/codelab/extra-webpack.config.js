const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const findLoader = (webpackConfig, regex) => {
  return webpackConfig.module.rules
    .filter(rule => !!rule.use)
    .find(rule => rule.use.find(it => !!it.loader && regex.test(it.loader)));
};

module.exports = (webpackConfig, cliConfig) => {
  if (cliConfig.buildOptimizer) {
    const loader = findLoader(
      webpackConfig,
      /@angular-devkit\/build-optimizer.*\/webpack-loader/
    );

    const originalTest = loader.test;
    loader.test = file => {
      const isMonaco = !!file.match('node_modules/monaco-editor');
      return !isMonaco && !!file.match(originalTest);
    };
  }

  webpackConfig.plugins.push(new MonacoWebpackPlugin());

  return webpackConfig;
};
