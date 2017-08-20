var path = require("path");
var Builder = require('systemjs-builder');
const rel = "src/assets/runner/ng2/";

const config = {
  transpiler: "ts",
  warnings: true,
  typescriptOptions: {
    "target": "es5",
    "module": "system",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true,
  },
  meta: {
    typescript: {
      exports: "ts"
    }
  },
  paths: {
    'npm:': 'node_modules/'
  },
  // map tells the System loader where to look for things
  map: {
    // our app is within the app folder
    app: 'src',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    // other libraries
    'rxjs': 'npm:rxjs',
    'typescript': 'npm:typescript/lib/typescript.js',
    'ts': "npm:plugin-typescript/lib",
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    'googlemaps': 'npm:googlemaps/lib/index.js'

  },
  // packages tells the System loader how to load when no filename and/or no extension
  packages: {
    'app': {
      main: './main',
      defaultExtension: 'ts'
    },
    'ts': {
      "main": "plugin.js"
    },
    'rxjs': {
      main: 'Rx',
      defaultExtension: 'js'
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
  .then(function () {
    console.log('Build complete');
  })
  .catch(function (err) {
    console.log('Build error');
    console.log(err);
  });
