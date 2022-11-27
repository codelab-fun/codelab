/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { _MatTabLabelWrapperBase } from '@angular/material/tabs';
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatTabLabelWrapper` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabLabelWrapper extends _MatTabLabelWrapperBase {
}
MatLegacyTabLabelWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabLabelWrapper, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyTabLabelWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyTabLabelWrapper, selector: "[matTabLabelWrapper]", inputs: { disabled: "disabled" }, host: { properties: { "class.mat-tab-disabled": "disabled", "attr.aria-disabled": "!!disabled" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyTabLabelWrapper, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxhYmVsLXdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFiLWxhYmVsLXdyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFeEM7OztHQUdHO0FBU0gsTUFBTSxPQUFPLHdCQUF5QixTQUFRLHVCQUF1Qjs7MEhBQXhELHdCQUF3Qjs4R0FBeEIsd0JBQXdCO2dHQUF4Qix3QkFBd0I7a0JBUnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNwQixJQUFJLEVBQUU7d0JBQ0osMEJBQTBCLEVBQUUsVUFBVTt3QkFDdEMsc0JBQXNCLEVBQUUsWUFBWTtxQkFDckM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtfTWF0VGFiTGFiZWxXcmFwcGVyQmFzZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge0RpcmVjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJMYWJlbFdyYXBwZXJgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYnNgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFRhYkxhYmVsV3JhcHBlcl0nLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnXSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MubWF0LXRhYi1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICchIWRpc2FibGVkJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5VGFiTGFiZWxXcmFwcGVyIGV4dGVuZHMgX01hdFRhYkxhYmVsV3JhcHBlckJhc2Uge31cbiJdfQ==