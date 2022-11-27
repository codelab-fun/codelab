/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatLegacyAnchor, MatLegacyButton } from './button';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatButtonModule` from `@angular/material/button` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyButtonModule {
}
MatLegacyButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyButtonModule, declarations: [MatLegacyButton, MatLegacyAnchor], imports: [MatRippleModule, MatCommonModule], exports: [MatLegacyButton, MatLegacyAnchor, MatCommonModule] });
MatLegacyButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyButtonModule, imports: [MatRippleModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, MatCommonModule],
                    exports: [MatLegacyButton, MatLegacyAnchor, MatCommonModule],
                    declarations: [MatLegacyButton, MatLegacyAnchor],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktYnV0dG9uL2J1dHRvbi1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUUxRDs7O0dBR0c7QUFNSCxNQUFNLE9BQU8scUJBQXFCOzt1SEFBckIscUJBQXFCO3dIQUFyQixxQkFBcUIsaUJBRmpCLGVBQWUsRUFBRSxlQUFlLGFBRnJDLGVBQWUsRUFBRSxlQUFlLGFBQ2hDLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZTt3SEFHaEQscUJBQXFCLFlBSnRCLGVBQWUsRUFBRSxlQUFlLEVBQ0UsZUFBZTtnR0FHaEQscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUM1RCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRMZWdhY3lBbmNob3IsIE1hdExlZ2FjeUJ1dHRvbn0gZnJvbSAnLi9idXR0b24nO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0QnV0dG9uTW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9idXR0b25gIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01hdFJpcHBsZU1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdExlZ2FjeUJ1dHRvbiwgTWF0TGVnYWN5QW5jaG9yLCBNYXRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRMZWdhY3lCdXR0b24sIE1hdExlZ2FjeUFuY2hvcl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUJ1dHRvbk1vZHVsZSB7fVxuIl19