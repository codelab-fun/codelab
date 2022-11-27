/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, InjectionToken, Input } from '@angular/core';
import * as i0 from "@angular/core";
let nextUniqueId = 0;
/**
 * Injection token that can be used to reference instances of `MatHint`. It serves as
 * alternative token to the actual `MatHint` class which could cause unnecessary
 * retention of the class and its directive metadata.
 *
 * *Note*: This is not part of the public API as the MDC-based form-field will not
 * need a lightweight token for `MatHint` and we want to reduce breaking changes.
 *
 * @deprecated Use `_MAT_HINT` from `@angular/material/form-field` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export const _MAT_LEGACY_HINT = new InjectionToken('MatHint');
/**
 * Hint text to be shown underneath the form field control.
 * @deprecated Use `MatHint` from `@angular/material/form-field` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyHint {
    constructor() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = `mat-hint-${nextUniqueId++}`;
    }
}
MatLegacyHint.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHint, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyHint.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyHint, selector: "mat-hint", inputs: { align: "align", id: "id" }, host: { properties: { "class.mat-form-field-hint-end": "align === \"end\"", "attr.id": "id", "attr.align": "null" }, classAttribute: "mat-hint" }, providers: [{ provide: _MAT_LEGACY_HINT, useExisting: MatLegacyHint }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyHint, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-hint',
                    host: {
                        'class': 'mat-hint',
                        '[class.mat-form-field-hint-end]': 'align === "end"',
                        '[attr.id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    },
                    providers: [{ provide: _MAT_LEGACY_HINT, useExisting: MatLegacyHint }],
                }]
        }], propDecorators: { align: [{
                type: Input
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktZm9ybS1maWVsZC9oaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFL0QsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBZ0IsU0FBUyxDQUFDLENBQUM7QUFFN0U7Ozs7R0FJRztBQVlILE1BQU0sT0FBTyxhQUFhO0lBWDFCO1FBWUUsdUVBQXVFO1FBQzlELFVBQUssR0FBb0IsT0FBTyxDQUFDO1FBRTFDLHVGQUF1RjtRQUM5RSxPQUFFLEdBQVcsWUFBWSxZQUFZLEVBQUUsRUFBRSxDQUFDO0tBQ3BEOzsrR0FOWSxhQUFhO21HQUFiLGFBQWEsNE5BRmIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFDLENBQUM7Z0dBRXpELGFBQWE7a0JBWHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsaUNBQWlDLEVBQUUsaUJBQWlCO3dCQUNwRCxXQUFXLEVBQUUsSUFBSTt3QkFDakIscUVBQXFFO3dCQUNyRSxjQUFjLEVBQUUsTUFBTTtxQkFDdkI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxlQUFlLEVBQUMsQ0FBQztpQkFDckU7OEJBR1UsS0FBSztzQkFBYixLQUFLO2dCQUdHLEVBQUU7c0JBQVYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5qZWN0aW9uVG9rZW4sIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVmZXJlbmNlIGluc3RhbmNlcyBvZiBgTWF0SGludGAuIEl0IHNlcnZlcyBhc1xuICogYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTWF0SGludGAgY2xhc3Mgd2hpY2ggY291bGQgY2F1c2UgdW5uZWNlc3NhcnlcbiAqIHJldGVudGlvbiBvZiB0aGUgY2xhc3MgYW5kIGl0cyBkaXJlY3RpdmUgbWV0YWRhdGEuXG4gKlxuICogKk5vdGUqOiBUaGlzIGlzIG5vdCBwYXJ0IG9mIHRoZSBwdWJsaWMgQVBJIGFzIHRoZSBNREMtYmFzZWQgZm9ybS1maWVsZCB3aWxsIG5vdFxuICogbmVlZCBhIGxpZ2h0d2VpZ2h0IHRva2VuIGZvciBgTWF0SGludGAgYW5kIHdlIHdhbnQgdG8gcmVkdWNlIGJyZWFraW5nIGNoYW5nZXMuXG4gKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBfTUFUX0hJTlRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGRgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuZXhwb3J0IGNvbnN0IF9NQVRfTEVHQUNZX0hJTlQgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWF0TGVnYWN5SGludD4oJ01hdEhpbnQnKTtcblxuLyoqXG4gKiBIaW50IHRleHQgdG8gYmUgc2hvd24gdW5kZXJuZWF0aCB0aGUgZm9ybSBmaWVsZCBjb250cm9sLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRIaW50YCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1oaW50JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtaGludCcsXG4gICAgJ1tjbGFzcy5tYXQtZm9ybS1maWVsZC1oaW50LWVuZF0nOiAnYWxpZ24gPT09IFwiZW5kXCInLFxuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgIC8vIFJlbW92ZSBhbGlnbiBhdHRyaWJ1dGUgdG8gcHJldmVudCBpdCBmcm9tIGludGVyZmVyaW5nIHdpdGggbGF5b3V0LlxuICAgICdbYXR0ci5hbGlnbl0nOiAnbnVsbCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBfTUFUX0xFR0FDWV9ISU5ULCB1c2VFeGlzdGluZzogTWF0TGVnYWN5SGludH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lIaW50IHtcbiAgLyoqIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGhpbnQgbGFiZWwgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgbGluZS4gKi9cbiAgQElucHV0KCkgYWxpZ246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLyoqIFVuaXF1ZSBJRCBmb3IgdGhlIGhpbnQuIFVzZWQgZm9yIHRoZSBhcmlhLWRlc2NyaWJlZGJ5IG9uIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wuICovXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgbWF0LWhpbnQtJHtuZXh0VW5pcXVlSWQrK31gO1xufVxuIl19