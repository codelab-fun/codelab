/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, Directive, ElementRef, Input } from '@angular/core';
import { MAT_ERROR } from '@angular/material/form-field';
import * as i0 from "@angular/core";
let nextUniqueId = 0;
/**
 * Single error message to be shown underneath the form field.
 * @deprecated Use `MatError` from `@angular/material/form-field` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyError {
    constructor(ariaLive, elementRef) {
        this.id = `mat-error-${nextUniqueId++}`;
        // If no aria-live value is set add 'polite' as a default. This is preferred over setting
        // role='alert' so that screen readers do not interrupt the current task to read this aloud.
        if (!ariaLive) {
            elementRef.nativeElement.setAttribute('aria-live', 'polite');
        }
    }
}
MatLegacyError.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyError, deps: [{ token: 'aria-live', attribute: true }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyError.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyError, selector: "mat-error", inputs: { id: "id" }, host: { attributes: { "aria-atomic": "true" }, properties: { "attr.id": "id" }, classAttribute: "mat-error" }, providers: [{ provide: MAT_ERROR, useExisting: MatLegacyError }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyError, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-error',
                    host: {
                        'class': 'mat-error',
                        '[attr.id]': 'id',
                        'aria-atomic': 'true',
                    },
                    providers: [{ provide: MAT_ERROR, useExisting: MatLegacyError }],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['aria-live']
                }] }, { type: i0.ElementRef }]; }, propDecorators: { id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWZvcm0tZmllbGQvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sOEJBQThCLENBQUM7O0FBRXZELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7OztHQUlHO0FBVUgsTUFBTSxPQUFPLGNBQWM7SUFHekIsWUFBb0MsUUFBZ0IsRUFBRSxVQUFzQjtRQUZuRSxPQUFFLEdBQVcsYUFBYSxZQUFZLEVBQUUsRUFBRSxDQUFDO1FBR2xELHlGQUF5RjtRQUN6Riw0RkFBNEY7UUFDNUYsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7O2dIQVRVLGNBQWMsa0JBR0YsV0FBVztvR0FIdkIsY0FBYyx5S0FGZCxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFDLENBQUM7Z0dBRW5ELGNBQWM7a0JBVDFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLGFBQWEsRUFBRSxNQUFNO3FCQUN0QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxnQkFBZ0IsRUFBQyxDQUFDO2lCQUMvRDs7MEJBSWMsU0FBUzsyQkFBQyxXQUFXO3FFQUZ6QixFQUFFO3NCQUFWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNQVRfRVJST1J9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqXG4gKiBTaW5nbGUgZXJyb3IgbWVzc2FnZSB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtIGZpZWxkLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRFcnJvcmAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtZXJyb3InLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1lcnJvcicsXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ2FyaWEtYXRvbWljJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX0VSUk9SLCB1c2VFeGlzdGluZzogTWF0TGVnYWN5RXJyb3J9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5RXJyb3Ige1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1lcnJvci0ke25leHRVbmlxdWVJZCsrfWA7XG5cbiAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgnYXJpYS1saXZlJykgYXJpYUxpdmU6IHN0cmluZywgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIC8vIElmIG5vIGFyaWEtbGl2ZSB2YWx1ZSBpcyBzZXQgYWRkICdwb2xpdGUnIGFzIGEgZGVmYXVsdC4gVGhpcyBpcyBwcmVmZXJyZWQgb3ZlciBzZXR0aW5nXG4gICAgLy8gcm9sZT0nYWxlcnQnIHNvIHRoYXQgc2NyZWVuIHJlYWRlcnMgZG8gbm90IGludGVycnVwdCB0aGUgY3VycmVudCB0YXNrIHRvIHJlYWQgdGhpcyBhbG91ZC5cbiAgICBpZiAoIWFyaWFMaXZlKSB7XG4gICAgICBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG4gICAgfVxuICB9XG59XG4iXX0=