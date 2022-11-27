/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { MAT_TAB_CONTENT, MatTabContent as MatNonLegacyTabContent } from '@angular/material/tabs';
import * as i0 from "@angular/core";
/**
 * Decorates the `ng-template` tags and reads out the template from it.
 * @deprecated Use `MatTabContent` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabContent extends MatNonLegacyTabContent {
}
MatLegacyTabContent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabContent, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyTabContent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyTabContent, selector: "[matTabContent]", providers: [{ provide: MAT_TAB_CONTENT, useExisting: MatLegacyTabContent }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabContent, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabContent]',
                    providers: [{ provide: MAT_TAB_CONTENT, useExisting: MatLegacyTabContent }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFiLWNvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDOztBQUVoRzs7OztHQUlHO0FBS0gsTUFBTSxPQUFPLG1CQUFvQixTQUFRLHNCQUFzQjs7cUhBQWxELG1CQUFtQjt5R0FBbkIsbUJBQW1CLDBDQUZuQixDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQztnR0FFOUQsbUJBQW1CO2tCQUovQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLHFCQUFxQixFQUFDLENBQUM7aUJBQzFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TUFUX1RBQl9DT05URU5ULCBNYXRUYWJDb250ZW50IGFzIE1hdE5vbkxlZ2FjeVRhYkNvbnRlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuXG4vKipcbiAqIERlY29yYXRlcyB0aGUgYG5nLXRlbXBsYXRlYCB0YWdzIGFuZCByZWFkcyBvdXQgdGhlIHRlbXBsYXRlIGZyb20gaXQuXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFRhYkNvbnRlbnRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYnNgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRhYkNvbnRlbnRdJyxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9UQUJfQ09OVEVOVCwgdXNlRXhpc3Rpbmc6IE1hdExlZ2FjeVRhYkNvbnRlbnR9XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5VGFiQ29udGVudCBleHRlbmRzIE1hdE5vbkxlZ2FjeVRhYkNvbnRlbnQge31cbiJdfQ==