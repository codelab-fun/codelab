(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@angular/platform-browser/testing"] = {}, global.ng, global.ngPlatformBrowser));
})(this, (function (exports, i0, platformBrowser) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);

    /**
     * @license Angular v15.0.1
     * (c) 2010-2022 Google LLC. https://angular.io/
     * License: MIT
     */
    function createNgZone() {
        return new i0.NgZone({ enableLongStackTrace: true, shouldCoalesceEventChangeDetection: false });
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function initBrowserTests() {
        platformBrowser["ɵBrowserDomAdapter"].makeCurrent();
    }
    const _TEST_BROWSER_PLATFORM_PROVIDERS = [{ provide: i0.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }];
    /**
     * Platform for testing
     *
     * @publicApi
     */
    const platformBrowserTesting = i0.createPlatformFactory(i0.platformCore, 'browserTesting', _TEST_BROWSER_PLATFORM_PROVIDERS);
    /**
     * NgModule for testing.
     *
     * @publicApi
     */
    class BrowserTestingModule {
    }
    BrowserTestingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserTestingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BrowserTestingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserTestingModule, exports: [platformBrowser.BrowserModule] });
    BrowserTestingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserTestingModule, providers: [
            { provide: i0.APP_ID, useValue: 'a' },
            { provide: i0.NgZone, useFactory: createNgZone },
        ], imports: [platformBrowser.BrowserModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserTestingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        exports: [platformBrowser.BrowserModule],
                        providers: [
                            { provide: i0.APP_ID, useValue: 'a' },
                            { provide: i0.NgZone, useFactory: createNgZone },
                        ]
                    }]
            }] });

    exports.BrowserTestingModule = BrowserTestingModule;
    exports.platformBrowserTesting = platformBrowserTesting;

}));
