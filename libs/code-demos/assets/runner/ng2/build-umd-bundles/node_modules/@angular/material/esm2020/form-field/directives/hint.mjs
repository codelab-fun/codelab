/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
let nextUniqueId = 0;
/** Hint text to be shown underneath the form field control. */
export class MatHint {
    constructor() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = `mat-mdc-hint-${nextUniqueId++}`;
    }
}
MatHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatHint, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatHint.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatHint, selector: "mat-hint", inputs: { align: "align", id: "id" }, host: { properties: { "class.mat-mdc-form-field-hint-end": "align === \"end\"", "id": "id", "attr.align": "null" }, classAttribute: "mat-mdc-form-field-hint mat-mdc-form-field-bottom-align" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatHint, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-hint',
                    host: {
                        'class': 'mat-mdc-form-field-hint mat-mdc-form-field-bottom-align',
                        '[class.mat-mdc-form-field-hint-end]': 'align === "end"',
                        '[id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    },
                }]
        }], propDecorators: { align: [{
                type: Input
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWZpZWxkL2RpcmVjdGl2ZXMvaGludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFL0MsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLCtEQUErRDtBQVcvRCxNQUFNLE9BQU8sT0FBTztJQVZwQjtRQVdFLHVFQUF1RTtRQUM5RCxVQUFLLEdBQW9CLE9BQU8sQ0FBQztRQUUxQyx1RkFBdUY7UUFDOUUsT0FBRSxHQUFXLGdCQUFnQixZQUFZLEVBQUUsRUFBRSxDQUFDO0tBQ3hEOzt5R0FOWSxPQUFPOzZGQUFQLE9BQU87Z0dBQVAsT0FBTztrQkFWbkIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSx5REFBeUQ7d0JBQ2xFLHFDQUFxQyxFQUFFLGlCQUFpQjt3QkFDeEQsTUFBTSxFQUFFLElBQUk7d0JBQ1oscUVBQXFFO3dCQUNyRSxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7aUJBQ0Y7OEJBR1UsS0FBSztzQkFBYixLQUFLO2dCQUdHLEVBQUU7c0JBQVYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuLyoqIEhpbnQgdGV4dCB0byBiZSBzaG93biB1bmRlcm5lYXRoIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtaGludCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1mb3JtLWZpZWxkLWhpbnQgbWF0LW1kYy1mb3JtLWZpZWxkLWJvdHRvbS1hbGlnbicsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWZvcm0tZmllbGQtaGludC1lbmRdJzogJ2FsaWduID09PSBcImVuZFwiJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgLy8gUmVtb3ZlIGFsaWduIGF0dHJpYnV0ZSB0byBwcmV2ZW50IGl0IGZyb20gaW50ZXJmZXJpbmcgd2l0aCBsYXlvdXQuXG4gICAgJ1thdHRyLmFsaWduXSc6ICdudWxsJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGludCB7XG4gIC8qKiBXaGV0aGVyIHRvIGFsaWduIHRoZSBoaW50IGxhYmVsIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGxpbmUuICovXG4gIEBJbnB1dCgpIGFsaWduOiAnc3RhcnQnIHwgJ2VuZCcgPSAnc3RhcnQnO1xuXG4gIC8qKiBVbmlxdWUgSUQgZm9yIHRoZSBoaW50LiBVc2VkIGZvciB0aGUgYXJpYS1kZXNjcmliZWRieSBvbiB0aGUgZm9ybSBmaWVsZCBjb250cm9sLiAqL1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gYG1hdC1tZGMtaGludC0ke25leHRVbmlxdWVJZCsrfWA7XG59XG4iXX0=