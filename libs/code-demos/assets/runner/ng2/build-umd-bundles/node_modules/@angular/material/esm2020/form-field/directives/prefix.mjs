/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Injection token that can be used to reference instances of `MatPrefix`. It serves as
 * alternative token to the actual `MatPrefix` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_PREFIX = new InjectionToken('MatPrefix');
/** Prefix to be placed in front of the form field. */
export class MatPrefix {
    constructor(elementRef) {
        this._isText = false;
        this._isText = elementRef.nativeElement.hasAttribute('matTextPrefix');
    }
}
MatPrefix.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPrefix, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatPrefix.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", providers: [{ provide: MAT_PREFIX, useExisting: MatPrefix }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatPrefix, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPrefix], [matIconPrefix], [matTextPrefix]',
                    providers: [{ provide: MAT_PREFIX, useExisting: MatPrefix }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tZmllbGQvZGlyZWN0aXZlcy9wcmVmaXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUVwRTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBRXJFLHNEQUFzRDtBQUt0RCxNQUFNLE9BQU8sU0FBUztJQUdwQixZQUFZLFVBQXNCO1FBRmxDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHZCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7OzJHQUxVLFNBQVM7K0ZBQVQsU0FBUyx3RUFGVCxDQUFDLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLENBQUM7Z0dBRS9DLFNBQVM7a0JBSnJCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLCtDQUErQztvQkFDekQsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsV0FBVyxFQUFDLENBQUM7aUJBQzNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0UHJlZml4YC4gSXQgc2VydmVzIGFzXG4gKiBhbHRlcm5hdGl2ZSB0b2tlbiB0byB0aGUgYWN0dWFsIGBNYXRQcmVmaXhgIGNsYXNzIHdoaWNoIGNvdWxkIGNhdXNlIHVubmVjZXNzYXJ5XG4gKiByZXRlbnRpb24gb2YgdGhlIGNsYXNzIGFuZCBpdHMgZGlyZWN0aXZlIG1ldGFkYXRhLlxuICovXG5leHBvcnQgY29uc3QgTUFUX1BSRUZJWCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRQcmVmaXg+KCdNYXRQcmVmaXgnKTtcblxuLyoqIFByZWZpeCB0byBiZSBwbGFjZWQgaW4gZnJvbnQgb2YgdGhlIGZvcm0gZmllbGQuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0UHJlZml4XSwgW21hdEljb25QcmVmaXhdLCBbbWF0VGV4dFByZWZpeF0nLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX1BSRUZJWCwgdXNlRXhpc3Rpbmc6IE1hdFByZWZpeH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRQcmVmaXgge1xuICBfaXNUZXh0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2lzVGV4dCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21hdFRleHRQcmVmaXgnKTtcbiAgfVxufVxuIl19