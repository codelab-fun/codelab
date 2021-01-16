module.exports = {
  name: 'intro',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/intro',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
