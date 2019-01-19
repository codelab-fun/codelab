var path = require('path');
var Builder = require('systemjs-builder');
const rel = 'libs/exercise/assets/runner/ng2/';

const config = {
  transpiler: 'ts',
  warnings: true,
  typescriptOptions: {
    target: 'es5',
    module: 'system',
    moduleResolution: 'node',
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    lib: ['es2015', 'dom'],
    noImplicitAny: true,
    suppressImplicitAnyIndexErrors: true
  },
  meta: {
    typescript: {
      exports: 'ts'
    }
  },
  paths: {
    'npm:': 'node_modules/',
    'rxjs/': 'node_modules/rxjs/'
  },
  // map tells the System loader where to look for things
  map: {
    // our app is within the app folder
    app: 'src',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/compiler/testing':
      'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser':
      'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/tree': 'npm:@angular/cdk/bundles/cdk-tree.umd.js',
    '@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/layout': 'npm:@angular/cdk/bundles/cdk-layout.umd.js',
    '@angular/cdk/text-field': 'npm:@angular/cdk/bundles/cdk-text-field.umd.js',
    '@angular/cdk/accordion': 'npm:@angular/cdk/bundles/cdk-accordion.umd.js',
    '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/collections':
      'npm:@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser':
      'npm:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations':
      'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser/testing':
      'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic':
      'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/platform-browser-dynamic/testing':
      'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    // other libraries
    'rxjs/operators': 'npm:rxjs/operators',
    rxjs: 'npm:rxjs',
    typescript: 'npm:typescript/lib/typescript.js',
    ts: 'npm:plugin-typescript/lib',
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    googlemaps: 'npm:googlemaps/lib/index.js'
  },
  // packages tells the System loader how to load when no filename and/or no extension
  packages: {
    app: {
      main: './main',
      defaultExtension: 'ts'
    },
    ts: {
      main: 'plugin.js'
    },
    'rxjs/operators': {
      main: 'index'
    },
    rxjs: {
      main: 'index'
    },

    'angular2-in-memory-web-api': {
      main: 'index',
      defaultExtension: 'js'
    }
  }
};

const builder = new Builder('./', config);

builder
  .bundle(rel + 'basic.ts', rel + 'ng-bundle.js')
  .then(function() {
    console.log('Build complete');
  })
  .catch(function(err) {
    console.log('Build error');
    console.log(err);
  });
