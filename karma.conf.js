module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['progress'],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    failOnEmptyTestSuite: false
  });
};
