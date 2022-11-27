/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef } from '@angular/core';
import { mixinInkBarItem } from './ink-bar';
import { mixinDisabled } from '@angular/material/core';
import * as i0 from "@angular/core";
// Boilerplate for applying mixins to MatTabLabelWrapper.
/** @docs-private */
const _MatTabLabelWrapperMixinBase = mixinDisabled(class {
});
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export class _MatTabLabelWrapperBase extends _MatTabLabelWrapperMixinBase {
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /** Sets focus on the wrapper element */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
_MatTabLabelWrapperBase.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTabLabelWrapperBase, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
_MatTabLabelWrapperBase.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: _MatTabLabelWrapperBase, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatTabLabelWrapperBase, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
const _MatTabLabelWrapperBaseWithInkBarItem = mixinInkBarItem(_MatTabLabelWrapperBase);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
export class MatTabLabelWrapper extends _MatTabLabelWrapperBaseWithInkBarItem {
}
MatTabLabelWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTabLabelWrapper, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatTabLabelWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: { disabled: "disabled", fitInkBarToContent: "fitInkBarToContent" }, host: { properties: { "class.mat-mdc-tab-disabled": "disabled", "attr.aria-disabled": "!!disabled" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatTabLabelWrapper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled', 'fitInkBarToContent'],
                    host: {
                        '[class.mat-mdc-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdGFicy90YWItbGFiZWwtd3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQWdCLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN6RCxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRWpFLHlEQUF5RDtBQUN6RCxvQkFBb0I7QUFDcEIsTUFBTSw0QkFBNEIsR0FBRyxhQUFhLENBQUM7Q0FBUSxDQUFDLENBQUM7QUFFN0Q7OztHQUdHO0FBRUgsTUFBTSxPQUFPLHVCQUF3QixTQUFRLDRCQUE0QjtJQUN2RSxZQUFtQixVQUFzQjtRQUN2QyxLQUFLLEVBQUUsQ0FBQztRQURTLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFekMsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxLQUFLO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQ25ELENBQUM7O3lIQWhCVSx1QkFBdUI7NkdBQXZCLHVCQUF1QjtnR0FBdkIsdUJBQXVCO2tCQURuQyxTQUFTOztBQW9CVixNQUFNLHFDQUFxQyxHQUFHLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBRXZGOzs7R0FHRztBQVNILE1BQU0sT0FBTyxrQkFDWCxTQUFRLHFDQUFxQzs7b0hBRGxDLGtCQUFrQjt3R0FBbEIsa0JBQWtCO2dHQUFsQixrQkFBa0I7a0JBUjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLG9CQUFvQixDQUFDO29CQUMxQyxJQUFJLEVBQUU7d0JBQ0osOEJBQThCLEVBQUUsVUFBVTt3QkFDMUMsc0JBQXNCLEVBQUUsWUFBWTtxQkFDckM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRJbmtCYXJJdGVtLCBtaXhpbklua0Jhckl0ZW19IGZyb20gJy4vaW5rLWJhcic7XG5pbXBvcnQge0NhbkRpc2FibGUsIG1peGluRGlzYWJsZWR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG4vLyBCb2lsZXJwbGF0ZSBmb3IgYXBwbHlpbmcgbWl4aW5zIHRvIE1hdFRhYkxhYmVsV3JhcHBlci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jb25zdCBfTWF0VGFiTGFiZWxXcmFwcGVyTWl4aW5CYXNlID0gbWl4aW5EaXNhYmxlZChjbGFzcyB7fSk7XG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYG1hdC10YWItZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSB0YWIgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBfTWF0VGFiTGFiZWxXcmFwcGVyQmFzZSBleHRlbmRzIF9NYXRUYWJMYWJlbFdyYXBwZXJNaXhpbkJhc2UgaW1wbGVtZW50cyBDYW5EaXNhYmxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqIFNldHMgZm9jdXMgb24gdGhlIHdyYXBwZXIgZWxlbWVudCAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgZ2V0T2Zmc2V0TGVmdCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0O1xuICB9XG5cbiAgZ2V0T2Zmc2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH1cbn1cblxuY29uc3QgX01hdFRhYkxhYmVsV3JhcHBlckJhc2VXaXRoSW5rQmFySXRlbSA9IG1peGluSW5rQmFySXRlbShfTWF0VGFiTGFiZWxXcmFwcGVyQmFzZSk7XG5cbi8qKlxuICogVXNlZCBpbiB0aGUgYG1hdC10YWItZ3JvdXBgIHZpZXcgdG8gZGlzcGxheSB0YWIgbGFiZWxzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0VGFiTGFiZWxXcmFwcGVyXScsXG4gIGlucHV0czogWydkaXNhYmxlZCcsICdmaXRJbmtCYXJUb0NvbnRlbnQnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LW1kYy10YWItZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnISFkaXNhYmxlZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRhYkxhYmVsV3JhcHBlclxuICBleHRlbmRzIF9NYXRUYWJMYWJlbFdyYXBwZXJCYXNlV2l0aElua0Jhckl0ZW1cbiAgaW1wbGVtZW50cyBNYXRJbmtCYXJJdGVtIHt9XG4iXX0=