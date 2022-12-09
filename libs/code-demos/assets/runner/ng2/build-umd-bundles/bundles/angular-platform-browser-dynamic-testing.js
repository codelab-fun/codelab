(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/core/testing'), require('@angular/platform-browser-dynamic'), require('@angular/platform-browser/testing'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/core/testing', '@angular/platform-browser-dynamic', '@angular/platform-browser/testing', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@angular/platform-browser-dynamic/testing"] = {}, global.ng, global.testing$1, global.ngPlatformBrowserDynamic, global.testing, global.ngCommon));
})(this, (function (exports, i0, testing$1, platformBrowserDynamic, testing, common) { 'use strict';

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

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A DOM based implementation of the TestComponentRenderer.
     */
    class DOMTestComponentRenderer extends testing$1.TestComponentRenderer {
        constructor(_doc) {
            super();
            this._doc = _doc;
        }
        insertRootElement(rootElId) {
            this.removeAllRootElements();
            const rootElement = common["ɵgetDOM"]().getDefaultDocument().createElement('div');
            rootElement.setAttribute('id', rootElId);
            this._doc.body.appendChild(rootElement);
        }
        removeAllRootElements() {
            // TODO(juliemr): can/should this be optional?
            const oldRoots = this._doc.querySelectorAll('[id^=root]');
            for (let i = 0; i < oldRoots.length; i++) {
                common["ɵgetDOM"]().remove(oldRoots[i]);
            }
        }
    }
    DOMTestComponentRenderer.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DOMTestComponentRenderer, deps: [{ token: common.DOCUMENT }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DOMTestComponentRenderer.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DOMTestComponentRenderer });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: DOMTestComponentRenderer, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [common.DOCUMENT]
                        }] }];
        } });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Platform for dynamic tests
     *
     * @publicApi
     */
    const platformCoreDynamicTesting = i0.createPlatformFactory(platformBrowserDynamic["ɵplatformCoreDynamic"], 'coreDynamicTesting', []);

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @publicApi
     */
    const platformBrowserDynamicTesting = i0.createPlatformFactory(platformCoreDynamicTesting, 'browserDynamicTesting', platformBrowserDynamic["ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS"]);
    /**
     * NgModule for testing.
     *
     * @publicApi
     */
    class BrowserDynamicTestingModule {
    }
    BrowserDynamicTestingModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserDynamicTestingModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    BrowserDynamicTestingModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserDynamicTestingModule, exports: [testing.BrowserTestingModule] });
    BrowserDynamicTestingModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserDynamicTestingModule, providers: [
            { provide: testing$1.TestComponentRenderer, useClass: DOMTestComponentRenderer },
        ], imports: [testing.BrowserTestingModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.1", ngImport: i0__namespace, type: BrowserDynamicTestingModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        exports: [testing.BrowserTestingModule],
                        providers: [
                            { provide: testing$1.TestComponentRenderer, useClass: DOMTestComponentRenderer },
                        ]
                    }]
            }] });

    exports.BrowserDynamicTestingModule = BrowserDynamicTestingModule;
    exports.platformBrowserDynamicTesting = platformBrowserDynamicTesting;
    exports["ɵDOMTestComponentRenderer"] = DOMTestComponentRenderer;
    exports["ɵplatformCoreDynamicTesting"] = platformCoreDynamicTesting;

}));
