/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { _MatAutocompleteOriginBase } from '@angular/material/autocomplete';
import * as i0 from "@angular/core";
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 * @deprecated Use `MatAutocompleteOrigin` from `@angular/material/autocomplete` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyAutocompleteOrigin extends _MatAutocompleteOriginBase {
}
MatLegacyAutocompleteOrigin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyAutocompleteOrigin, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyAutocompleteOrigin.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyAutocompleteOrigin, selector: "[matAutocompleteOrigin]", exportAs: ["matAutocompleteOrigin"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyAutocompleteOrigin, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matAutocompleteOrigin]',
                    exportAs: 'matAutocompleteOrigin',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFMUU7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsMEJBQTBCOzs2SEFBOUQsMkJBQTJCO2lIQUEzQiwyQkFBMkI7Z0dBQTNCLDJCQUEyQjtrQkFKdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxRQUFRLEVBQUUsdUJBQXVCO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge19NYXRBdXRvY29tcGxldGVPcmlnaW5CYXNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBhcHBsaWVkIHRvIGFuIGVsZW1lbnQgdG8gbWFrZSBpdCB1c2FibGVcbiAqIGFzIGEgY29ubmVjdGlvbiBwb2ludCBmb3IgYW4gYXV0b2NvbXBsZXRlIHBhbmVsLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRBdXRvY29tcGxldGVPcmlnaW5gIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0QXV0b2NvbXBsZXRlT3JpZ2luXScsXG4gIGV4cG9ydEFzOiAnbWF0QXV0b2NvbXBsZXRlT3JpZ2luJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5QXV0b2NvbXBsZXRlT3JpZ2luIGV4dGVuZHMgX01hdEF1dG9jb21wbGV0ZU9yaWdpbkJhc2Uge31cbiJdfQ==