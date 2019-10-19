module.exports = {
  name: 'kirjs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/kirjs/'
};

/*
const { join } = require('path');
const getBaseKarmaConfig = require('../../_del_karma.conf');

module.exports = function(config) {
  const baseConfig = getBaseKarmaConfig(config);
  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: join(__dirname, '../../coverage/apps/kirjs')
    }
  });
};*/
