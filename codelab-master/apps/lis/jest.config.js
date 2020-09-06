module.exports = {
  name: 'lis',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lis',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
