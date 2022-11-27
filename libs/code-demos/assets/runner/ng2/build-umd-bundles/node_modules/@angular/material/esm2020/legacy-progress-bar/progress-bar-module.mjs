/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyProgressBar } from './progress-bar';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatProgressBarModule` from `@angular/material/progress-bar` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyProgressBarModule {
}
MatLegacyProgressBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyProgressBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressBarModule, declarations: [MatLegacyProgressBar], imports: [CommonModule, MatCommonModule], exports: [MatLegacyProgressBar, MatCommonModule] });
MatLegacyProgressBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressBarModule, imports: [CommonModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCommonModule],
                    exports: [MatLegacyProgressBar, MatCommonModule],
                    declarations: [MatLegacyProgressBar],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUVwRDs7O0dBR0c7QUFNSCxNQUFNLE9BQU8sMEJBQTBCOzs0SEFBMUIsMEJBQTBCOzZIQUExQiwwQkFBMEIsaUJBRnRCLG9CQUFvQixhQUZ6QixZQUFZLEVBQUUsZUFBZSxhQUM3QixvQkFBb0IsRUFBRSxlQUFlOzZIQUdwQywwQkFBMEIsWUFKM0IsWUFBWSxFQUFFLGVBQWUsRUFDUCxlQUFlO2dHQUdwQywwQkFBMEI7a0JBTHRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDeEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxDQUFDO29CQUNoRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5UHJvZ3Jlc3NCYXJ9IGZyb20gJy4vcHJvZ3Jlc3MtYmFyJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFByb2dyZXNzQmFyTW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXJgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdExlZ2FjeVByb2dyZXNzQmFyLCBNYXRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRMZWdhY3lQcm9ncmVzc0Jhcl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVByb2dyZXNzQmFyTW9kdWxlIHt9XG4iXX0=