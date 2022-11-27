/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, Directive, ElementRef, InjectionToken, Input } from '@angular/core';
import * as i0 from "@angular/core";
let nextUniqueId = 0;
/**
 * Injection token that can be used to reference instances of `MatError`. It serves as
 * alternative token to the actual `MatError` class which could cause unnecessary
 * retention of the class and its directive metadata.
 */
export const MAT_ERROR = new InjectionToken('MatError');
/** Single error message to be shown underneath the form-field. */
export class MatError {
    constructor(ariaLive, elementRef) {
        this.id = `mat-mdc-error-${nextUniqueId++}`;
        // If no aria-live value is set add 'polite' as a default. This is preferred over setting
        // role='alert' so that screen readers do not interrupt the current task to read this aloud.
        if (!ariaLive) {
            elementRef.nativeElement.setAttribute('aria-live', 'polite');
        }
    }
}
MatError.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatError, deps: [{ token: 'aria-live', attribute: true }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MatError.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatError, selector: "mat-error, [matError]", inputs: { id: "id" }, host: { attributes: { "aria-atomic": "true" }, properties: { "id": "id" }, classAttribute: "mat-mdc-form-field-error mat-mdc-form-field-bottom-align" }, providers: [{ provide: MAT_ERROR, useExisting: MatError }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatError, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-error, [matError]',
                    host: {
                        'class': 'mat-mdc-form-field-error mat-mdc-form-field-bottom-align',
                        'aria-atomic': 'true',
                        '[id]': 'id',
                    },
                    providers: [{ provide: MAT_ERROR, useExisting: MatError }],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['aria-live']
                }] }, { type: i0.ElementRef }]; }, propDecorators: { id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1maWVsZC9kaXJlY3RpdmVzL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV0RixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBVyxVQUFVLENBQUMsQ0FBQztBQUVsRSxrRUFBa0U7QUFVbEUsTUFBTSxPQUFPLFFBQVE7SUFHbkIsWUFBb0MsUUFBZ0IsRUFBRSxVQUFzQjtRQUZuRSxPQUFFLEdBQVcsaUJBQWlCLFlBQVksRUFBRSxFQUFFLENBQUM7UUFHdEQseUZBQXlGO1FBQ3pGLDRGQUE0RjtRQUM1RixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQzs7MEdBVFUsUUFBUSxrQkFHSSxXQUFXOzhGQUh2QixRQUFRLCtOQUZSLENBQUMsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQztnR0FFN0MsUUFBUTtrQkFUcEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDBEQUEwRDt3QkFDbkUsYUFBYSxFQUFFLE1BQU07d0JBQ3JCLE1BQU0sRUFBRSxJQUFJO3FCQUNiO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLFVBQVUsRUFBQyxDQUFDO2lCQUN6RDs7MEJBSWMsU0FBUzsyQkFBQyxXQUFXO3FFQUZ6QixFQUFFO3NCQUFWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0aW9uVG9rZW4sIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0RXJyb3JgLiBJdCBzZXJ2ZXMgYXNcbiAqIGFsdGVybmF0aXZlIHRva2VuIHRvIHRoZSBhY3R1YWwgYE1hdEVycm9yYCBjbGFzcyB3aGljaCBjb3VsZCBjYXVzZSB1bm5lY2Vzc2FyeVxuICogcmV0ZW50aW9uIG9mIHRoZSBjbGFzcyBhbmQgaXRzIGRpcmVjdGl2ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1BVF9FUlJPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRFcnJvcj4oJ01hdEVycm9yJyk7XG5cbi8qKiBTaW5nbGUgZXJyb3IgbWVzc2FnZSB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtLWZpZWxkLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWVycm9yLCBbbWF0RXJyb3JdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtbWRjLWZvcm0tZmllbGQtZXJyb3IgbWF0LW1kYy1mb3JtLWZpZWxkLWJvdHRvbS1hbGlnbicsXG4gICAgJ2FyaWEtYXRvbWljJzogJ3RydWUnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9FUlJPUiwgdXNlRXhpc3Rpbmc6IE1hdEVycm9yfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEVycm9yIHtcbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYXQtbWRjLWVycm9yLSR7bmV4dFVuaXF1ZUlkKyt9YDtcblxuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCdhcmlhLWxpdmUnKSBhcmlhTGl2ZTogc3RyaW5nLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgLy8gSWYgbm8gYXJpYS1saXZlIHZhbHVlIGlzIHNldCBhZGQgJ3BvbGl0ZScgYXMgYSBkZWZhdWx0LiBUaGlzIGlzIHByZWZlcnJlZCBvdmVyIHNldHRpbmdcbiAgICAvLyByb2xlPSdhbGVydCcgc28gdGhhdCBzY3JlZW4gcmVhZGVycyBkbyBub3QgaW50ZXJydXB0IHRoZSBjdXJyZW50IHRhc2sgdG8gcmVhZCB0aGlzIGFsb3VkLlxuICAgIGlmICghYXJpYUxpdmUpIHtcbiAgICAgIGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==