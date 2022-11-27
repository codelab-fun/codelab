/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { Inject, InjectionToken, NgModule, Optional } from '@angular/core';
import { VERSION as CDK_VERSION } from '@angular/cdk';
import { DOCUMENT } from '@angular/common';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { VERSION } from '../version';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
/** @docs-private */
export function MATERIAL_SANITY_CHECKS_FACTORY() {
    return true;
}
/** Injection token that configures whether the Material sanity checks are enabled. */
export const MATERIAL_SANITY_CHECKS = new InjectionToken('mat-sanity-checks', {
    providedIn: 'root',
    factory: MATERIAL_SANITY_CHECKS_FACTORY,
});
/**
 * Module that captures anything that should be loaded and/or run for *all* Angular Material
 * components. This includes Bidi, etc.
 *
 * This module should be imported to each top-level component module (e.g., MatTabsModule).
 */
export class MatCommonModule {
    constructor(highContrastModeDetector, _sanityChecks, _document) {
        this._sanityChecks = _sanityChecks;
        this._document = _document;
        /** Whether we've done the global sanity checks (e.g. a theme is loaded, there is a doctype). */
        this._hasDoneGlobalChecks = false;
        // While A11yModule also does this, we repeat it here to avoid importing A11yModule
        // in MatCommonModule.
        highContrastModeDetector._applyBodyHighContrastModeCssClasses();
        if (!this._hasDoneGlobalChecks) {
            this._hasDoneGlobalChecks = true;
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (this._checkIsEnabled('doctype')) {
                    _checkDoctypeIsDefined(this._document);
                }
                if (this._checkIsEnabled('theme')) {
                    _checkThemeIsPresent(this._document);
                }
                if (this._checkIsEnabled('version')) {
                    _checkCdkVersionMatch();
                }
            }
        }
    }
    /** Gets whether a specific sanity check is enabled. */
    _checkIsEnabled(name) {
        if (_isTestEnvironment()) {
            return false;
        }
        if (typeof this._sanityChecks === 'boolean') {
            return this._sanityChecks;
        }
        return !!this._sanityChecks[name];
    }
}
MatCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCommonModule, deps: [{ token: i1.HighContrastModeDetector }, { token: MATERIAL_SANITY_CHECKS, optional: true }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.NgModule });
MatCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCommonModule, imports: [BidiModule], exports: [BidiModule] });
MatCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCommonModule, imports: [BidiModule, BidiModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule],
                    exports: [BidiModule],
                }]
        }], ctorParameters: function () { return [{ type: i1.HighContrastModeDetector }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MATERIAL_SANITY_CHECKS]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
/** Checks that the page has a doctype. */
function _checkDoctypeIsDefined(doc) {
    if (!doc.doctype) {
        console.warn('Current document does not have a doctype. This may cause ' +
            'some Angular Material components not to behave as expected.');
    }
}
/** Checks that a theme has been included. */
function _checkThemeIsPresent(doc) {
    // We need to assert that the `body` is defined, because these checks run very early
    // and the `body` won't be defined if the consumer put their scripts in the `head`.
    if (!doc.body || typeof getComputedStyle !== 'function') {
        return;
    }
    const testElement = doc.createElement('div');
    testElement.classList.add('mat-theme-loaded-marker');
    doc.body.appendChild(testElement);
    const computedStyle = getComputedStyle(testElement);
    // In some situations the computed style of the test element can be null. For example in
    // Firefox, the computed style is null if an application is running inside of a hidden iframe.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    if (computedStyle && computedStyle.display !== 'none') {
        console.warn('Could not find Angular Material core theme. Most Material ' +
            'components may not work as expected. For more info refer ' +
            'to the theming guide: https://material.angular.io/guide/theming');
    }
    testElement.remove();
}
/** Checks whether the Material version matches the CDK version. */
function _checkCdkVersionMatch() {
    if (VERSION.full !== CDK_VERSION.full) {
        console.warn('The Angular Material version (' +
            VERSION.full +
            ') does not match ' +
            'the Angular CDK version (' +
            CDK_VERSION.full +
            ').\n' +
            'Please ensure the versions of these two packages exactly match.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jb3JlL2NvbW1vbi1iZWhhdmlvcnMvY29tbW9uLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsT0FBTyxJQUFJLFdBQVcsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQzs7O0FBRW5DLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsOEJBQThCO0lBQzVDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELHNGQUFzRjtBQUN0RixNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGNBQWMsQ0FBZSxtQkFBbUIsRUFBRTtJQUMxRixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsOEJBQThCO0NBQ3hDLENBQUMsQ0FBQztBQWVIOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLGVBQWU7SUFJMUIsWUFDRSx3QkFBa0QsRUFDRSxhQUEyQixFQUNyRCxTQUFtQjtRQURPLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ3JELGNBQVMsR0FBVCxTQUFTLENBQVU7UUFOL0MsZ0dBQWdHO1FBQ3hGLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQU9uQyxtRkFBbUY7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QUFJO1lBQ1osbUJBQW1CO1lBQ25CLDJCQUEyQjtZQUMzQixXQUFXLENBQUMsSUFBSTtZQUNoQixNQUFNO1lBQ04saUVBQWlFLENBQ3BFLENBQUM7S0FDSDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtIaWdoQ29udHJhc3RNb2RlRGV0ZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7QmlkaU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWRVJTSU9OIGFzIENES19WRVJTSU9OfSBmcm9tICdAYW5ndWxhci9jZGsnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7X2lzVGVzdEVudmlyb25tZW50fSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuLi92ZXJzaW9uJztcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBNQVRFUklBTF9TQU5JVFlfQ0hFQ0tTX0ZBQ1RPUlkoKTogU2FuaXR5Q2hlY2tzIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjb25maWd1cmVzIHdoZXRoZXIgdGhlIE1hdGVyaWFsIHNhbml0eSBjaGVja3MgYXJlIGVuYWJsZWQuICovXG5leHBvcnQgY29uc3QgTUFURVJJQUxfU0FOSVRZX0NIRUNLUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTYW5pdHlDaGVja3M+KCdtYXQtc2FuaXR5LWNoZWNrcycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiBNQVRFUklBTF9TQU5JVFlfQ0hFQ0tTX0ZBQ1RPUlksXG59KTtcblxuLyoqXG4gKiBQb3NzaWJsZSBzYW5pdHkgY2hlY2tzIHRoYXQgY2FuIGJlIGVuYWJsZWQuIElmIHNldCB0b1xuICogdHJ1ZS9mYWxzZSwgYWxsIGNoZWNrcyB3aWxsIGJlIGVuYWJsZWQvZGlzYWJsZWQuXG4gKi9cbmV4cG9ydCB0eXBlIFNhbml0eUNoZWNrcyA9IGJvb2xlYW4gfCBHcmFudWxhclNhbml0eUNoZWNrcztcblxuLyoqIE9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgc2FuaXR5IGNoZWNrcyBncmFudWxhcmx5LiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmFudWxhclNhbml0eUNoZWNrcyB7XG4gIGRvY3R5cGU6IGJvb2xlYW47XG4gIHRoZW1lOiBib29sZWFuO1xuICB2ZXJzaW9uOiBib29sZWFuO1xufVxuXG4vKipcbiAqIE1vZHVsZSB0aGF0IGNhcHR1cmVzIGFueXRoaW5nIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBhbmQvb3IgcnVuIGZvciAqYWxsKiBBbmd1bGFyIE1hdGVyaWFsXG4gKiBjb21wb25lbnRzLiBUaGlzIGluY2x1ZGVzIEJpZGksIGV0Yy5cbiAqXG4gKiBUaGlzIG1vZHVsZSBzaG91bGQgYmUgaW1wb3J0ZWQgdG8gZWFjaCB0b3AtbGV2ZWwgY29tcG9uZW50IG1vZHVsZSAoZS5nLiwgTWF0VGFic01vZHVsZSkuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlXSxcbiAgZXhwb3J0czogW0JpZGlNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRDb21tb25Nb2R1bGUge1xuICAvKiogV2hldGhlciB3ZSd2ZSBkb25lIHRoZSBnbG9iYWwgc2FuaXR5IGNoZWNrcyAoZS5nLiBhIHRoZW1lIGlzIGxvYWRlZCwgdGhlcmUgaXMgYSBkb2N0eXBlKS4gKi9cbiAgcHJpdmF0ZSBfaGFzRG9uZUdsb2JhbENoZWNrcyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGhpZ2hDb250cmFzdE1vZGVEZXRlY3RvcjogSGlnaENvbnRyYXN0TW9kZURldGVjdG9yLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFURVJJQUxfU0FOSVRZX0NIRUNLUykgcHJpdmF0ZSBfc2FuaXR5Q2hlY2tzOiBTYW5pdHlDaGVja3MsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50LFxuICApIHtcbiAgICAvLyBXaGlsZSBBMTF5TW9kdWxlIGFsc28gZG9lcyB0aGlzLCB3ZSByZXBlYXQgaXQgaGVyZSB0byBhdm9pZCBpbXBvcnRpbmcgQTExeU1vZHVsZVxuICAgIC8vIGluIE1hdENvbW1vbk1vZHVsZS5cbiAgICBoaWdoQ29udHJhc3RNb2RlRGV0ZWN0b3IuX2FwcGx5Qm9keUhpZ2hDb250cmFzdE1vZGVDc3NDbGFzc2VzKCk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc0RvbmVHbG9iYWxDaGVja3MpIHtcbiAgICAgIHRoaXMuX2hhc0RvbmVHbG9iYWxDaGVja3MgPSB0cnVlO1xuXG4gICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jaGVja0lzRW5hYmxlZCgnZG9jdHlwZScpKSB7XG4gICAgICAgICAgX2NoZWNrRG9jdHlwZUlzRGVmaW5lZCh0aGlzLl9kb2N1bWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hlY2tJc0VuYWJsZWQoJ3RoZW1lJykpIHtcbiAgICAgICAgICBfY2hlY2tUaGVtZUlzUHJlc2VudCh0aGlzLl9kb2N1bWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hlY2tJc0VuYWJsZWQoJ3ZlcnNpb24nKSkge1xuICAgICAgICAgIF9jaGVja0Nka1ZlcnNpb25NYXRjaCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciBhIHNwZWNpZmljIHNhbml0eSBjaGVjayBpcyBlbmFibGVkLiAqL1xuICBwcml2YXRlIF9jaGVja0lzRW5hYmxlZChuYW1lOiBrZXlvZiBHcmFudWxhclNhbml0eUNoZWNrcyk6IGJvb2xlYW4ge1xuICAgIGlmIChfaXNUZXN0RW52aXJvbm1lbnQoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5fc2FuaXR5Q2hlY2tzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zYW5pdHlDaGVja3M7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhdGhpcy5fc2FuaXR5Q2hlY2tzW25hbWVdO1xuICB9XG59XG5cbi8qKiBDaGVja3MgdGhhdCB0aGUgcGFnZSBoYXMgYSBkb2N0eXBlLiAqL1xuZnVuY3Rpb24gX2NoZWNrRG9jdHlwZUlzRGVmaW5lZChkb2M6IERvY3VtZW50KTogdm9pZCB7XG4gIGlmICghZG9jLmRvY3R5cGUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnQ3VycmVudCBkb2N1bWVudCBkb2VzIG5vdCBoYXZlIGEgZG9jdHlwZS4gVGhpcyBtYXkgY2F1c2UgJyArXG4gICAgICAgICdzb21lIEFuZ3VsYXIgTWF0ZXJpYWwgY29tcG9uZW50cyBub3QgdG8gYmVoYXZlIGFzIGV4cGVjdGVkLicsXG4gICAgKTtcbiAgfVxufVxuXG4vKiogQ2hlY2tzIHRoYXQgYSB0aGVtZSBoYXMgYmVlbiBpbmNsdWRlZC4gKi9cbmZ1bmN0aW9uIF9jaGVja1RoZW1lSXNQcmVzZW50KGRvYzogRG9jdW1lbnQpOiB2b2lkIHtcbiAgLy8gV2UgbmVlZCB0byBhc3NlcnQgdGhhdCB0aGUgYGJvZHlgIGlzIGRlZmluZWQsIGJlY2F1c2UgdGhlc2UgY2hlY2tzIHJ1biB2ZXJ5IGVhcmx5XG4gIC8vIGFuZCB0aGUgYGJvZHlgIHdvbid0IGJlIGRlZmluZWQgaWYgdGhlIGNvbnN1bWVyIHB1dCB0aGVpciBzY3JpcHRzIGluIHRoZSBgaGVhZGAuXG4gIGlmICghZG9jLmJvZHkgfHwgdHlwZW9mIGdldENvbXB1dGVkU3R5bGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0ZXN0RWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWF0LXRoZW1lLWxvYWRlZC1tYXJrZXInKTtcbiAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRlc3RFbGVtZW50KTtcblxuICAvLyBJbiBzb21lIHNpdHVhdGlvbnMgdGhlIGNvbXB1dGVkIHN0eWxlIG9mIHRoZSB0ZXN0IGVsZW1lbnQgY2FuIGJlIG51bGwuIEZvciBleGFtcGxlIGluXG4gIC8vIEZpcmVmb3gsIHRoZSBjb21wdXRlZCBzdHlsZSBpcyBudWxsIGlmIGFuIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgaW5zaWRlIG9mIGEgaGlkZGVuIGlmcmFtZS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgaWYgKGNvbXB1dGVkU3R5bGUgJiYgY29tcHV0ZWRTdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnQ291bGQgbm90IGZpbmQgQW5ndWxhciBNYXRlcmlhbCBjb3JlIHRoZW1lLiBNb3N0IE1hdGVyaWFsICcgK1xuICAgICAgICAnY29tcG9uZW50cyBtYXkgbm90IHdvcmsgYXMgZXhwZWN0ZWQuIEZvciBtb3JlIGluZm8gcmVmZXIgJyArXG4gICAgICAgICd0byB0aGUgdGhlbWluZyBndWlkZTogaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL3RoZW1pbmcnLFxuICAgICk7XG4gIH1cblxuICB0ZXN0RWxlbWVudC5yZW1vdmUoKTtcbn1cblxuLyoqIENoZWNrcyB3aGV0aGVyIHRoZSBNYXRlcmlhbCB2ZXJzaW9uIG1hdGNoZXMgdGhlIENESyB2ZXJzaW9uLiAqL1xuZnVuY3Rpb24gX2NoZWNrQ2RrVmVyc2lvbk1hdGNoKCk6IHZvaWQge1xuICBpZiAoVkVSU0lPTi5mdWxsICE9PSBDREtfVkVSU0lPTi5mdWxsKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ1RoZSBBbmd1bGFyIE1hdGVyaWFsIHZlcnNpb24gKCcgK1xuICAgICAgICBWRVJTSU9OLmZ1bGwgK1xuICAgICAgICAnKSBkb2VzIG5vdCBtYXRjaCAnICtcbiAgICAgICAgJ3RoZSBBbmd1bGFyIENESyB2ZXJzaW9uICgnICtcbiAgICAgICAgQ0RLX1ZFUlNJT04uZnVsbCArXG4gICAgICAgICcpLlxcbicgK1xuICAgICAgICAnUGxlYXNlIGVuc3VyZSB0aGUgdmVyc2lvbnMgb2YgdGhlc2UgdHdvIHBhY2thZ2VzIGV4YWN0bHkgbWF0Y2guJyxcbiAgICApO1xuICB9XG59XG4iXX0=