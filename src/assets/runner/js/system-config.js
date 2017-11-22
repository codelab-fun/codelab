function loadSystemModule(name, code) {
  window.define = function (deps, callback) {
    console.log(window.System.x);
    window.System.amdDefine(name, deps, callback)
  };
  window.define.amd = true;
  eval(code);
}

System.config({
  map: {
    'rxjs': 'npm:rxjs',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
    '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/stepper': 'npm:@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
  },
  packages: {
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
