module.exports = {
  name: 'playground',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/playground',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
