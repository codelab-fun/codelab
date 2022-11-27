/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule, MatPseudoCheckboxModule, MatCommonModule } from '@angular/material/core';
import { MatLegacyOption } from './option';
import { MatLegacyOptgroup } from './optgroup';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatOptionModule` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyOptionModule {
}
MatLegacyOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyOptionModule, declarations: [MatLegacyOption, MatLegacyOptgroup], imports: [MatRippleModule, CommonModule, MatCommonModule, MatPseudoCheckboxModule], exports: [MatLegacyOption, MatLegacyOptgroup] });
MatLegacyOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyOptionModule, imports: [MatRippleModule, CommonModule, MatCommonModule, MatPseudoCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, CommonModule, MatCommonModule, MatPseudoCheckboxModule],
                    exports: [MatLegacyOption, MatLegacyOptgroup],
                    declarations: [MatLegacyOption, MatLegacyOptgroup],
                }]
        }] });
export * from './option';
export * from './optgroup';
export { 
/**
 * @deprecated Use `MAT_OPTGROUP` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
MAT_OPTGROUP as MAT_LEGACY_OPTGROUP, 
/**
 * @deprecated Use `MatOptionSelectionChange` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
MatOptionSelectionChange as MatLegacyOptionSelectionChange, 
/**
 * @deprecated Use `MAT_OPTION_PARENT_COMPONENT` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
MAT_OPTION_PARENT_COMPONENT as MAT_LEGACY_OPTION_PARENT_COMPONENT, 
/**
 * @deprecated Use `_countGroupLabelsBeforeOption` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
_countGroupLabelsBeforeOption as _countGroupLabelsBeforeLegacyOption, 
/**
 * @deprecated Use `_getOptionScrollPosition` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
_getOptionScrollPosition as _getLegacyOptionScrollPosition, 
/**
 * @deprecated Use `_MatOptionBase` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
_MatOptionBase as _MatLegacyOptionBase, 
/**
 * @deprecated Use `_MatOptgroupBase` from `@angular/material/core` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
_MatOptgroupBase as _MatLegacyOptgroupBase, } from '@angular/material/core';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWNvcmUvb3B0aW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakcsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxZQUFZLENBQUM7O0FBRTdDOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxxQkFBcUI7O3VIQUFyQixxQkFBcUI7d0hBQXJCLHFCQUFxQixpQkFGakIsZUFBZSxFQUFFLGlCQUFpQixhQUZ2QyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsYUFDdkUsZUFBZSxFQUFFLGlCQUFpQjt3SEFHakMscUJBQXFCLFlBSnRCLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjtnR0FJdEUscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixDQUFDO29CQUNsRixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUM7b0JBQzdDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQztpQkFDbkQ7O0FBR0QsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxZQUFZLENBQUM7QUFFM0IsT0FBTztBQUNMOzs7R0FHRztBQUNILFlBQVksSUFBSSxtQkFBbUI7QUFFbkM7OztHQUdHO0FBQ0gsd0JBQXdCLElBQUksOEJBQThCO0FBUTFEOzs7R0FHRztBQUNILDJCQUEyQixJQUFJLGtDQUFrQztBQUVqRTs7O0dBR0c7QUFDSCw2QkFBNkIsSUFBSSxtQ0FBbUM7QUFFcEU7OztHQUdHO0FBQ0gsd0JBQXdCLElBQUksOEJBQThCO0FBRTFEOzs7R0FHRztBQUNILGNBQWMsSUFBSSxvQkFBb0I7QUFFdEM7OztHQUdHO0FBQ0gsZ0JBQWdCLElBQUksc0JBQXNCLEdBQzNDLE1BQU0sd0JBQXdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0UmlwcGxlTW9kdWxlLCBNYXRQc2V1ZG9DaGVja2JveE1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5T3B0aW9ufSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQge01hdExlZ2FjeU9wdGdyb3VwfSBmcm9tICcuL29wdGdyb3VwJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdE9wdGlvbk1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0UmlwcGxlTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgTWF0UHNldWRvQ2hlY2tib3hNb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0TGVnYWN5T3B0aW9uLCBNYXRMZWdhY3lPcHRncm91cF0sXG4gIGRlY2xhcmF0aW9uczogW01hdExlZ2FjeU9wdGlvbiwgTWF0TGVnYWN5T3B0Z3JvdXBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lPcHRpb25Nb2R1bGUge31cblxuZXhwb3J0ICogZnJvbSAnLi9vcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9vcHRncm91cCc7XG5cbmV4cG9ydCB7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYE1BVF9PUFRHUk9VUGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gICAqL1xuICBNQVRfT1BUR1JPVVAgYXMgTUFUX0xFR0FDWV9PUFRHUk9VUCxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRPcHRpb25TZWxlY3Rpb25DaGFuZ2VgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NvcmVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICAgKi9cbiAgTWF0T3B0aW9uU2VsZWN0aW9uQ2hhbmdlIGFzIE1hdExlZ2FjeU9wdGlvblNlbGVjdGlvbkNoYW5nZSxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRPcHRpb25QYXJlbnRDb21wb25lbnRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NvcmVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICAgKi9cbiAgTWF0T3B0aW9uUGFyZW50Q29tcG9uZW50IGFzIE1hdExlZ2FjeU9wdGlvblBhcmVudENvbXBvbmVudCxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NvcmVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICAgKi9cbiAgTUFUX09QVElPTl9QQVJFTlRfQ09NUE9ORU5UIGFzIE1BVF9MRUdBQ1lfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb25gIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NvcmVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICAgKi9cbiAgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVPcHRpb24gYXMgX2NvdW50R3JvdXBMYWJlbHNCZWZvcmVMZWdhY3lPcHRpb24sXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgX2dldE9wdGlvblNjcm9sbFBvc2l0aW9uYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9jb3JlYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAgICovXG4gIF9nZXRPcHRpb25TY3JvbGxQb3NpdGlvbiBhcyBfZ2V0TGVnYWN5T3B0aW9uU2Nyb2xsUG9zaXRpb24sXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgX01hdE9wdGlvbkJhc2VgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NvcmVgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICAgKi9cbiAgX01hdE9wdGlvbkJhc2UgYXMgX01hdExlZ2FjeU9wdGlvbkJhc2UsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgX01hdE9wdGdyb3VwQmFzZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZWAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gICAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gICAqL1xuICBfTWF0T3B0Z3JvdXBCYXNlIGFzIF9NYXRMZWdhY3lPcHRncm91cEJhc2UsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuIl19