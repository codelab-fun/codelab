module.exports = {
  name: 'playground-quiz',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/playground/quiz',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
