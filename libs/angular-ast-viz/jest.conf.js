module.exports = {
  name: 'angular-ast-viz',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/angular-ast-viz'
};
/*
const { join } = require('path');
const getBaseKarmaConfig = require('../../karma.conf');

module.exports = function(config) {
  const baseConfig = getBaseKarmaConfig();
  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '../../coverage/libs/angular-ast-viz')
    }
  });
};
*/
