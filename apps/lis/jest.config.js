module.exports = {
  name: 'lis',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lis',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
