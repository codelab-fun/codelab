/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, inject, NgZone, ViewChild, } from '@angular/core';
import { MatRipple, mixinColor, mixinDisabled, mixinDisableRipple, } from '@angular/material/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
/** Inputs common to all buttons. */
export const MAT_BUTTON_INPUTS = ['disabled', 'disableRipple', 'color'];
/** Shared host configuration for all buttons */
export const MAT_BUTTON_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons.
    '[class.mat-mdc-button-base]': 'true',
};
/** List of classes to add to buttons instances based on host attribute selector. */
const HOST_SELECTOR_MDC_CLASS_PAIR = [
    {
        selector: 'mat-button',
        mdcClasses: ['mdc-button', 'mat-mdc-button'],
    },
    {
        selector: 'mat-flat-button',
        mdcClasses: ['mdc-button', 'mdc-button--unelevated', 'mat-mdc-unelevated-button'],
    },
    {
        selector: 'mat-raised-button',
        mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    },
    {
        selector: 'mat-stroked-button',
        mdcClasses: ['mdc-button', 'mdc-button--outlined', 'mat-mdc-outlined-button'],
    },
    {
        selector: 'mat-fab',
        mdcClasses: ['mdc-fab', 'mat-mdc-fab'],
    },
    {
        selector: 'mat-mini-fab',
        mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
    },
    {
        selector: 'mat-icon-button',
        mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
    },
];
// Boilerplate for applying mixins to MatButton.
/** @docs-private */
export const _MatButtonMixin = mixinColor(mixinDisabled(mixinDisableRipple(class {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
})));
/** Base class for all buttons.  */
export class MatButtonBase extends _MatButtonMixin {
    constructor(elementRef, _platform, _ngZone, _animationMode) {
        super(elementRef);
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._animationMode = _animationMode;
        this._focusMonitor = inject(FocusMonitor);
        /** Whether this button is a FAB. Used to apply the correct class on the ripple. */
        this._isFab = false;
        const classList = elementRef.nativeElement.classList;
        // For each of the variant selectors that is present in the button's host
        // attributes, add the correct corresponding MDC classes.
        for (const pair of HOST_SELECTOR_MDC_CLASS_PAIR) {
            if (this._hasHostAttributes(pair.selector)) {
                pair.mdcClasses.forEach((className) => {
                    classList.add(className);
                });
            }
        }
    }
    ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, true);
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /** Focuses the button. */
    focus(_origin = 'program', options) {
        if (_origin) {
            this._focusMonitor.focusVia(this._elementRef.nativeElement, _origin, options);
        }
        else {
            this._elementRef.nativeElement.focus(options);
        }
    }
    /** Gets whether the button has one of the given attributes. */
    _hasHostAttributes(...attributes) {
        return attributes.some(attribute => this._elementRef.nativeElement.hasAttribute(attribute));
    }
    _isRippleDisabled() {
        return this.disableRipple || this.disabled;
    }
}
MatButtonBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
MatButtonBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatButtonBase, viewQueries: [{ propertyName: "ripple", first: true, predicate: MatRipple, descendants: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined }]; }, propDecorators: { ripple: [{
                type: ViewChild,
                args: [MatRipple]
            }] } });
/** Shared inputs by buttons using the `<a>` tag */
export const MAT_ANCHOR_INPUTS = ['disabled', 'disableRipple', 'color', 'tabIndex'];
/** Shared host configuration for buttons using the `<a>` tag. */
export const MAT_ANCHOR_HOST = {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    // Note that we ignore the user-specified tabindex when it's disabled for
    // consistency with the `mat-button` applied on native buttons where even
    // though they have an index, they're not tabbable.
    '[attr.tabindex]': 'disabled ? -1 : tabIndex',
    '[attr.aria-disabled]': 'disabled.toString()',
    // MDC automatically applies the primary theme color to the button, but we want to support
    // an unthemed version. If color is undefined, apply a CSS class that makes it easy to
    // select and style this "theme".
    '[class.mat-unthemed]': '!color',
    // Add a class that applies to all buttons. This makes it easier to target if somebody
    // wants to target all Material buttons.
    '[class.mat-mdc-button-base]': 'true',
};
/**
 * Anchor button base.
 */
export class MatAnchorBase extends MatButtonBase {
    constructor(elementRef, platform, ngZone, animationMode) {
        super(elementRef, platform, ngZone, animationMode);
        this._haltDisabledEvents = (event) => {
            // A disabled button shouldn't apply any actions
            if (this.disabled) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };
    }
    ngOnInit() {
        this._ngZone.runOutsideAngular(() => {
            this._elementRef.nativeElement.addEventListener('click', this._haltDisabledEvents);
        });
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._elementRef.nativeElement.removeEventListener('click', this._haltDisabledEvents);
    }
}
MatAnchorBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAnchorBase, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
MatAnchorBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatAnchorBase, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAnchorBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.NgZone }, { type: undefined }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvYnV0dG9uL2J1dHRvbi1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLE1BQU0sRUFHTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUlMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGtCQUFrQixHQUNuQixNQUFNLHdCQUF3QixDQUFDOzs7QUFFaEMsb0NBQW9DO0FBQ3BDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV4RSxnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHO0lBQzdCLGlCQUFpQixFQUFFLGtCQUFrQjtJQUNyQyxpQ0FBaUMsRUFBRSxxQ0FBcUM7SUFDeEUsMEZBQTBGO0lBQzFGLHNGQUFzRjtJQUN0RixpQ0FBaUM7SUFDakMsc0JBQXNCLEVBQUUsUUFBUTtJQUNoQyxzRkFBc0Y7SUFDdEYsd0NBQXdDO0lBQ3hDLDZCQUE2QixFQUFFLE1BQU07Q0FDdEMsQ0FBQztBQUVGLG9GQUFvRjtBQUNwRixNQUFNLDRCQUE0QixHQUErQztJQUMvRTtRQUNFLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztLQUM3QztJQUNEO1FBQ0UsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixVQUFVLEVBQUUsQ0FBQyxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsMkJBQTJCLENBQUM7S0FD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LENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUSxXQUFXO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEYsQ0FBQzs7K0dBaEJVLGFBQWE7bUdBQWIsYUFBYTtnR0FBYixhQUFhO2tCQUR6QixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Rm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgaW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkRpc2FibGUsXG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIE1hdFJpcHBsZSxcbiAgbWl4aW5Db2xvcixcbiAgbWl4aW5EaXNhYmxlZCxcbiAgbWl4aW5EaXNhYmxlUmlwcGxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuLyoqIElucHV0cyBjb21tb24gdG8gYWxsIGJ1dHRvbnMuICovXG5leHBvcnQgY29uc3QgTUFUX0JVVFRPTl9JTlBVVFMgPSBbJ2Rpc2FibGVkJywgJ2Rpc2FibGVSaXBwbGUnLCAnY29sb3InXTtcblxuLyoqIFNoYXJlZCBob3N0IGNvbmZpZ3VyYXRpb24gZm9yIGFsbCBidXR0b25zICovXG5leHBvcnQgY29uc3QgTUFUX0JVVFRPTl9IT1NUID0ge1xuICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgLy8gTURDIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgcHJpbWFyeSB0aGVtZSBjb2xvciB0byB0aGUgYnV0dG9uLCBidXQgd2Ugd2FudCB0byBzdXBwb3J0XG4gIC8vIGFuIHVudGhlbWVkIHZlcnNpb24uIElmIGNvbG9yIGlzIHVuZGVmaW5lZCwgYXBwbHkgYSBDU1MgY2xhc3MgdGhhdCBtYWtlcyBpdCBlYXN5IHRvXG4gIC8vIHNlbGVjdCBhbmQgc3R5bGUgdGhpcyBcInRoZW1lXCIuXG4gICdbY2xhc3MubWF0LXVudGhlbWVkXSc6ICchY29sb3InLFxuICAvLyBBZGQgYSBjbGFzcyB0aGF0IGFwcGxpZXMgdG8gYWxsIGJ1dHRvbnMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHRhcmdldCBpZiBzb21lYm9keVxuICAvLyB3YW50cyB0byB0YXJnZXQgYWxsIE1hdGVyaWFsIGJ1dHRvbnMuXG4gICdbY2xhc3MubWF0LW1kYy1idXR0b24tYmFzZV0nOiAndHJ1ZScsXG59O1xuXG4vKiogTGlzdCBvZiBjbGFzc2VzIHRvIGFkZCB0byBidXR0b25zIGluc3RhbmNlcyBiYXNlZCBvbiBob3N0IGF0dHJpYnV0ZSBzZWxlY3Rvci4gKi9cbmNvbnN0IEhPU1RfU0VMRUNUT1JfTURDX0NMQVNTX1BBSVI6IHtzZWxlY3Rvcjogc3RyaW5nOyBtZGNDbGFzc2VzOiBzdHJpbmdbXX1bXSA9IFtcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21hdC1tZGMtYnV0dG9uJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1mbGF0LWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLXVuZWxldmF0ZWQnLCAnbWF0LW1kYy11bmVsZXZhdGVkLWJ1dHRvbiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtcmFpc2VkLWJ1dHRvbicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtYnV0dG9uJywgJ21kYy1idXR0b24tLXJhaXNlZCcsICdtYXQtbWRjLXJhaXNlZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LXN0cm9rZWQtYnV0dG9uJyxcbiAgICBtZGNDbGFzc2VzOiBbJ21kYy1idXR0b24nLCAnbWRjLWJ1dHRvbi0tb3V0bGluZWQnLCAnbWF0LW1kYy1vdXRsaW5lZC1idXR0b24nXSxcbiAgfSxcbiAge1xuICAgIHNlbGVjdG9yOiAnbWF0LWZhYicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtZmFiJywgJ21hdC1tZGMtZmFiJ10sXG4gIH0sXG4gIHtcbiAgICBzZWxlY3RvcjogJ21hdC1taW5pLWZhYicsXG4gICAgbWRjQ2xhc3NlczogWydtZGMtZmFiJywgJ21kYy1mYWItLW1pbmknLCAnbWF0LW1kYy1taW5pLWZhYiddLFxuICB9LFxuICB7XG4gICAgc2VsZWN0b3I6ICdtYXQtaWNvbi1idXR0b24nLFxuICAgIG1kY0NsYXNzZXM6IFsnbWRjLWljb24tYnV0dG9uJywgJ21hdC1tZGMtaWNvbi1idXR0b24nXSxcbiAgfSxcbl07XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0QnV0dG9uLlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBjb25zdCBfTWF0QnV0dG9uTWl4aW4gPSBtaXhpbkNvbG9yKFxuICBtaXhpbkRpc2FibGVkKFxuICAgIG1peGluRGlzYWJsZVJpcHBsZShcbiAgICAgIGNsYXNzIHtcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuICAgICAgfSxcbiAgICApLFxuICApLFxuKTtcblxuLyoqIEJhc2UgY2xhc3MgZm9yIGFsbCBidXR0b25zLiAgKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIE1hdEJ1dHRvbkJhc2VcbiAgZXh0ZW5kcyBfTWF0QnV0dG9uTWl4aW5cbiAgaW1wbGVtZW50cyBDYW5EaXNhYmxlLCBDYW5Db2xvciwgQ2FuRGlzYWJsZVJpcHBsZSwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95XG57XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZvY3VzTW9uaXRvciA9IGluamVjdChGb2N1c01vbml0b3IpO1xuXG4gIC8qKiBXaGV0aGVyIHRoaXMgYnV0dG9uIGlzIGEgRkFCLiBVc2VkIHRvIGFwcGx5IHRoZSBjb3JyZWN0IGNsYXNzIG9uIHRoZSByaXBwbGUuICovXG4gIF9pc0ZhYiA9IGZhbHNlO1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIE1hdFJpcHBsZSBpbnN0YW5jZSBvZiB0aGUgYnV0dG9uLiAqL1xuICBAVmlld0NoaWxkKE1hdFJpcHBsZSkgcmlwcGxlOiBNYXRSaXBwbGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwdWJsaWMgX25nWm9uZTogTmdab25lLFxuICAgIHB1YmxpYyBfYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICBjb25zdCBjbGFzc0xpc3QgPSAoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3Q7XG5cbiAgICAvLyBGb3IgZWFjaCBvZiB0aGUgdmFyaWFudCBzZWxlY3RvcnMgdGhhdCBpcyBwcmVzZW50IGluIHRoZSBidXR0b24ncyBob3N0XG4gICAgLy8gYXR0cmlidXRlcywgYWRkIHRoZSBjb3JyZWN0IGNvcnJlc3BvbmRpbmcgTURDIGNsYXNzZXMuXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIEhPU1RfU0VMRUNUT1JfTURDX0NMQVNTX1BBSVIpIHtcbiAgICAgIGlmICh0aGlzLl9oYXNIb3N0QXR0cmlidXRlcyhwYWlyLnNlbGVjdG9yKSkge1xuICAgICAgICBwYWlyLm1kY0NsYXNzZXMuZm9yRWFjaCgoY2xhc3NOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLl9lbGVtZW50UmVmLCB0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLl9lbGVtZW50UmVmKTtcbiAgfVxuXG4gIC8qKiBGb2N1c2VzIHRoZSBidXR0b24uICovXG4gIGZvY3VzKF9vcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nLCBvcHRpb25zPzogRm9jdXNPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKF9vcmlnaW4pIHtcbiAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIF9vcmlnaW4sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldHMgd2hldGhlciB0aGUgYnV0dG9uIGhhcyBvbmUgb2YgdGhlIGdpdmVuIGF0dHJpYnV0ZXMuICovXG4gIHByaXZhdGUgX2hhc0hvc3RBdHRyaWJ1dGVzKC4uLmF0dHJpYnV0ZXM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXMuc29tZShhdHRyaWJ1dGUgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpKTtcbiAgfVxuXG4gIF9pc1JpcHBsZURpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVSaXBwbGUgfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxufVxuXG4vKiogU2hhcmVkIGlucHV0cyBieSBidXR0b25zIHVzaW5nIHRoZSBgPGE+YCB0YWcgKi9cbmV4cG9ydCBjb25zdCBNQVRfQU5DSE9SX0lOUFVUUyA9IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICdjb2xvcicsICd0YWJJbmRleCddO1xuXG4vKiogU2hhcmVkIGhvc3QgY29uZmlndXJhdGlvbiBmb3IgYnV0dG9ucyB1c2luZyB0aGUgYDxhPmAgdGFnLiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9BTkNIT1JfSE9TVCA9IHtcbiAgJ1thdHRyLmRpc2FibGVkXSc6ICdkaXNhYmxlZCB8fCBudWxsJyxcbiAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiAnX2FuaW1hdGlvbk1vZGUgPT09IFwiTm9vcEFuaW1hdGlvbnNcIicsXG5cbiAgLy8gTm90ZSB0aGF0IHdlIGlnbm9yZSB0aGUgdXNlci1zcGVjaWZpZWQgdGFiaW5kZXggd2hlbiBpdCdzIGRpc2FibGVkIGZvclxuICAvLyBjb25zaXN0ZW5jeSB3aXRoIHRoZSBgbWF0LWJ1dHRvbmAgYXBwbGllZCBvbiBuYXRpdmUgYnV0dG9ucyB3aGVyZSBldmVuXG4gIC8vIHRob3VnaCB0aGV5IGhhdmUgYW4gaW5kZXgsIHRoZXkncmUgbm90IHRhYmJhYmxlLlxuICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiB0YWJJbmRleCcsXG4gICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgLy8gTURDIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgcHJpbWFyeSB0aGVtZSBjb2xvciB0byB0aGUgYnV0dG9uLCBidXQgd2Ugd2FudCB0byBzdXBwb3J0XG4gIC8vIGFuIHVudGhlbWVkIHZlcnNpb24uIElmIGNvbG9yIGlzIHVuZGVmaW5lZCwgYXBwbHkgYSBDU1MgY2xhc3MgdGhhdCBtYWtlcyBpdCBlYXN5IHRvXG4gIC8vIHNlbGVjdCBhbmQgc3R5bGUgdGhpcyBcInRoZW1lXCIuXG4gICdbY2xhc3MubWF0LXVudGhlbWVkXSc6ICchY29sb3InLFxuICAvLyBBZGQgYSBjbGFzcyB0aGF0IGFwcGxpZXMgdG8gYWxsIGJ1dHRvbnMuIFRoaXMgbWFrZXMgaXQgZWFzaWVyIHRvIHRhcmdldCBpZiBzb21lYm9keVxuICAvLyB3YW50cyB0byB0YXJnZXQgYWxsIE1hdGVyaWFsIGJ1dHRvbnMuXG4gICdbY2xhc3MubWF0LW1kYy1idXR0b24tYmFzZV0nOiAndHJ1ZScsXG59O1xuXG4vKipcbiAqIEFuY2hvciBidXR0b24gYmFzZS5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTWF0QW5jaG9yQmFzZSBleHRlbmRzIE1hdEJ1dHRvbkJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHRhYkluZGV4OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcGxhdGZvcm06IFBsYXRmb3JtLCBuZ1pvbmU6IE5nWm9uZSwgYW5pbWF0aW9uTW9kZT86IHN0cmluZykge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHBsYXRmb3JtLCBuZ1pvbmUsIGFuaW1hdGlvbk1vZGUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbHREaXNhYmxlZEV2ZW50cyk7XG4gICAgfSk7XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbHREaXNhYmxlZEV2ZW50cyk7XG4gIH1cblxuICBfaGFsdERpc2FibGVkRXZlbnRzID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xuICAgIC8vIEEgZGlzYWJsZWQgYnV0dG9uIHNob3VsZG4ndCBhcHBseSBhbnkgYWN0aW9uc1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xufVxuIl19