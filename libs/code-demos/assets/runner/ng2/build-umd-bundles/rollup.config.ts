import { RollupOptions } from 'rollup';

const path = require('path');
const dir = __dirname;
/** @type {Array<import('rollup').RollupOptions>} */

const external = [
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/platform-browser',
];

const globals = {
  '@angular/core': 'ng',
  '@angular/compiler': 'ngCompiler',
  '@angular/common': 'ngCommon',
  '@angular/platform-browser': 'ngPlatformBrowser',
  '@angular/platform-browser-dynamic': 'ngPlatformBrowserDynamic',
};

module.exports = [
  {
    input: 'node_modules/@angular/core/fesm2015/core.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-core.js'),
      format: 'umd',
      name: 'ng',
      globals,
    },
    external,
  },
  {
    input:
      'node_modules/@angular/platform-browser/fesm2015/platform-browser.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-platform-browser.js'),
      format: 'umd',
      name: 'ngPlatformBrowser',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/@angular/compiler/fesm2015/compiler.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-compiler.js'),
      format: 'umd',
      name: 'ngCompiler',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/@angular/common/fesm2015/common.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-common.js'),
      format: 'umd',
      name: 'ngCommon',
      globals,
    },
    external,
  },
  {
    input:
      'node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.mjs',
    output: {
      file: path.join(dir, 'bundles', 'angular-platform-browser-dynamic.js'),
      format: 'umd',
      name: 'ngPlatformBrowserDynamic',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/rxjs/_esm2015/index.js',
    output: {
      file: path.join(dir, 'bundles', 'rxjs.js'),
      format: 'umd',
      name: 'rxjs',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/rxjs/_esm2015/operators/index.js',
    output: {
      file: path.join(dir, 'bundles', 'rxjs-operators.js'),
      format: 'umd',
      name: 'rxjsOperators',
      globals,
    },
    external,
  },
  {
    input: 'node_modules/zone.js/fesm2015/zone.js',
    output: {
      file: path.join(dir, 'bundles', 'zone.js'),
      format: 'umd',
      name: 'Zone',
      globals,
    },
    external,
  },
];
