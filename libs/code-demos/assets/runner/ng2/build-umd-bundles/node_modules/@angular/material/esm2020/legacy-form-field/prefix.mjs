/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { MAT_PREFIX } from '@angular/material/form-field';
import * as i0 from "@angular/core";
/**
 * Prefix to be placed in front of the form field.
 * @deprecated Use `MatPrefix` from `@angular/material/form-field` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyPrefix {
}
MatLegacyPrefix.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyPrefix, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyPrefix.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyPrefix, selector: "[matPrefix]", providers: [{ provide: MAT_PREFIX, useExisting: MatLegacyPrefix }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyPrefix, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matPrefix]',
                    providers: [{ provide: MAT_PREFIX, useExisting: MatLegacyPrefix }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1mb3JtLWZpZWxkL3ByZWZpeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7QUFFeEQ7Ozs7R0FJRztBQUtILE1BQU0sT0FBTyxlQUFlOztpSEFBZixlQUFlO3FHQUFmLGVBQWUsc0NBRmYsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBQyxDQUFDO2dHQUVyRCxlQUFlO2tCQUozQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxpQkFBaUIsRUFBQyxDQUFDO2lCQUNqRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01BVF9QUkVGSVh9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuXG4vKipcbiAqIFByZWZpeCB0byBiZSBwbGFjZWQgaW4gZnJvbnQgb2YgdGhlIGZvcm0gZmllbGQuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFByZWZpeGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0UHJlZml4XScsXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfUFJFRklYLCB1c2VFeGlzdGluZzogTWF0TGVnYWN5UHJlZml4fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVByZWZpeCB7fVxuIl19