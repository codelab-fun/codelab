module.exports = {
  name: 'browser',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/browser',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
