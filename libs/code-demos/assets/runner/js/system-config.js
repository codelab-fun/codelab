function loadSystemModule(name, code) {
  window.define = function(deps, callback) {
    console.log(window.System.x);
    window.System.amdDefine(name, deps, callback);
  };
  window.define.amd = true;
  eval(code);
}

global['module'] = {};

System.config({
  map: {
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/compiler/testing':
      'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser':
      'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
    '@angular/material/autocomplete':
      'npm:@angular/material/bundles/material-autocomplete.umd.js',
    '@angular/material/autocomplete-testing':
      'npm:@angular/material/bundles/material-autocomplete-testing.umd.js',
    '@angular/material/badge':
      'npm:@angular/material/bundles/material-badge.umd.js',
    '@angular/material/bottom-sheet':
      'npm:@angular/material/bundles/material-bottom-sheet.umd.js',
    '@angular/material/button':
      'npm:@angular/material/bundles/material-button.umd.js',
    '@angular/material/button-testing':
      'npm:@angular/material/bundles/material-button-testing.umd.js',
    '@angular/material/button-toggle':
      'npm:@angular/material/bundles/material-button-toggle.umd.js',
    '@angular/material/card':
      'npm:@angular/material/bundles/material-card.umd.js',
    '@angular/material/checkbox':
      'npm:@angular/material/bundles/material-checkbox.umd.js',
    '@angular/material/checkbox-testing':
      'npm:@angular/material/bundles/material-checkbox-testing.umd.js',
    '@angular/material/chips':
      'npm:@angular/material/bundles/material-chips.umd.js',
    '@angular/material/core':
      'npm:@angular/material/bundles/material-core.umd.js',
    '@angular/material/datepicker':
      'npm:@angular/material/bundles/material-datepicker.umd.js',
    '@angular/material/dialog':
      'npm:@angular/material/bundles/material-dialog.umd.js',
    '@angular/material/dialog-testing':
      'npm:@angular/material/bundles/material-dialog-testing.umd.js',
    '@angular/material/divider':
      'npm:@angular/material/bundles/material-divider.umd.js',
    '@angular/material/expansion':
      'npm:@angular/material/bundles/material-expansion.umd.js',
    '@angular/material/form-field':
      'npm:@angular/material/bundles/material-form-field.umd.js',
    '@angular/material/grid-list':
      'npm:@angular/material/bundles/material-grid-list.umd.js',
    '@angular/material/icon':
      'npm:@angular/material/bundles/material-icon.umd.js',
    '@angular/material/input':
      'npm:@angular/material/bundles/material-input.umd.js',
    '@angular/material/list':
      'npm:@angular/material/bundles/material-list.umd.js',
    '@angular/material/menu':
      'npm:@angular/material/bundles/material-menu.umd.js',
    '@angular/material/menu-testing':
      'npm:@angular/material/bundles/material-menu-testing.umd.js',
    '@angular/material/paginator':
      'npm:@angular/material/bundles/material-paginator.umd.js',
    '@angular/material/progress-bar':
      'npm:@angular/material/bundles/material-progress-bar.umd.js',
    '@angular/material/progress-bar-testing':
      'npm:@angular/material/bundles/material-progress-bar-testing.umd.js',
    '@angular/material/progress-spinner':
      'npm:@angular/material/bundles/material-progress-spinner.umd.js',
    '@angular/material/progress-spinner-testing':
      'npm:@angular/material/bundles/material-progress-spinner-testing.umd.js',
    '@angular/material/radio':
      'npm:@angular/material/bundles/material-radio.umd.js',
    '@angular/material/radio-testing':
      'npm:@angular/material/bundles/material-radio-testing.umd.js',
    '@angular/material/select':
      'npm:@angular/material/bundles/material-select.umd.js',
    '@angular/material/sidenav':
      'npm:@angular/material/bundles/material-sidenav.umd.js',
    '@angular/material/sidenav-testing':
      'npm:@angular/material/bundles/material-sidenav-testing.umd.js',
    '@angular/material/slide-toggle':
      'npm:@angular/material/bundles/material-slide-toggle.umd.js',
    '@angular/material/slide-toggle-testing':
      'npm:@angular/material/bundles/material-slide-toggle-testing.umd.js',
    '@angular/material/slider':
      'npm:@angular/material/bundles/material-slider.umd.js',
    '@angular/material/slider-testing':
      'npm:@angular/material/bundles/material-slider-testing.umd.js',
    '@angular/material/snack-bar':
      'npm:@angular/material/bundles/material-snack-bar.umd.js',
    '@angular/material/snack-bar-testing':
      'npm:@angular/material/bundles/material-snack-bar-testing.umd.js',
    '@angular/material/sort':
      'npm:@angular/material/bundles/material-sort.umd.js',
    '@angular/material/stepper':
      'npm:@angular/material/bundles/material-stepper.umd.js',
    '@angular/material/table':
      'npm:@angular/material/bundles/material-table.umd.js',
    '@angular/material/tabs':
      'npm:@angular/material/bundles/material-tabs.umd.js',
    '@angular/material/tabs-testing':
      'npm:@angular/material/bundles/material-tabs-testing.umd.js',
    '@angular/material/toolbar':
      'npm:@angular/material/bundles/material-toolbar.umd.js',
    '@angular/material/tooltip':
      'npm:@angular/material/bundles/material-tooltip.umd.js',
    '@angular/material/tree':
      'npm:@angular/material/bundles/material-tree.umd.js',
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
    tslib: 'npm:tslib/tslib.js',
    'rxjs/operators': 'npm:rxjs/operators',
    rxjs: 'npm:rxjs'
  },
  warnings: true,
  packages: {
    'rxjs/operators': {
      main: 'index'
    },
    rxjs: {
      main: 'index'
    }
  }
});
