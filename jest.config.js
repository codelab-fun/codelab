module.exports = {
  testMatch: ['**/+(*.)+(spec).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
    '\\.wasm$': 'jest-raw-loader'
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['../../setup-jest.ts'],
  moduleNameMapper: {
    'monaco-editor': '../../node_modules/monaco-editor'
  }
};
