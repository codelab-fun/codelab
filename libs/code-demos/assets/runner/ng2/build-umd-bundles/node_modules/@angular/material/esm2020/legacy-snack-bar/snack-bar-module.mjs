/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { LegacySimpleSnackBar } from './simple-snack-bar';
import { MatLegacySnackBarContainer } from './snack-bar-container';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatSnackBarModule` from `@angular/material/snack-bar` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacySnackBarModule {
}
MatLegacySnackBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacySnackBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBarModule, declarations: [MatLegacySnackBarContainer, LegacySimpleSnackBar], imports: [OverlayModule, PortalModule, CommonModule, MatLegacyButtonModule, MatCommonModule], exports: [MatLegacySnackBarContainer, MatCommonModule] });
MatLegacySnackBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBarModule, imports: [OverlayModule, PortalModule, CommonModule, MatLegacyButtonModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacySnackBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule, CommonModule, MatLegacyButtonModule, MatCommonModule],
                    exports: [MatLegacySnackBarContainer, MatCommonModule],
                    declarations: [MatLegacySnackBarContainer, LegacySimpleSnackBar],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hY2stYmFyLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktc25hY2stYmFyL3NuYWNrLWJhci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7O0FBRWpFOzs7R0FHRztBQU1ILE1BQU0sT0FBTyx1QkFBdUI7O3lIQUF2Qix1QkFBdUI7MEhBQXZCLHVCQUF1QixpQkFGbkIsMEJBQTBCLEVBQUUsb0JBQW9CLGFBRnJELGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsYUFDakYsMEJBQTBCLEVBQUUsZUFBZTswSEFHMUMsdUJBQXVCLFlBSnhCLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFDckQsZUFBZTtnR0FHMUMsdUJBQXVCO2tCQUxuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsQ0FBQztvQkFDNUYsT0FBTyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsZUFBZSxDQUFDO29CQUN0RCxZQUFZLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxvQkFBb0IsQ0FBQztpQkFDakUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMZWdhY3lCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1idXR0b24nO1xuaW1wb3J0IHtMZWdhY3lTaW1wbGVTbmFja0Jhcn0gZnJvbSAnLi9zaW1wbGUtc25hY2stYmFyJztcbmltcG9ydCB7TWF0TGVnYWN5U25hY2tCYXJDb250YWluZXJ9IGZyb20gJy4vc25hY2stYmFyLWNvbnRhaW5lcic7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRTbmFja0Jhck1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0TGVnYWN5QnV0dG9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0TGVnYWN5U25hY2tCYXJDb250YWluZXIsIE1hdENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdExlZ2FjeVNuYWNrQmFyQ29udGFpbmVyLCBMZWdhY3lTaW1wbGVTbmFja0Jhcl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVNuYWNrQmFyTW9kdWxlIHt9XG4iXX0=