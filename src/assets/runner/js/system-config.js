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
