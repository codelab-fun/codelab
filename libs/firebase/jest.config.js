module.exports = {
  name: 'firebase',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/firebase',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
