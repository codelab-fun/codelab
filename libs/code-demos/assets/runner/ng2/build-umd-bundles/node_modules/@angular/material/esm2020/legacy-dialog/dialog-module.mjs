/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER, MatLegacyDialog } from './dialog';
import { MatLegacyDialogContainer } from './dialog-container';
import { MatLegacyDialogActions, MatLegacyDialogClose, MatLegacyDialogContent, MatLegacyDialogTitle, } from './dialog-content-directives';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatDialogModule` from `@angular/material/dialog` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyDialogModule {
}
MatLegacyDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, declarations: [MatLegacyDialogContainer,
        MatLegacyDialogClose,
        MatLegacyDialogTitle,
        MatLegacyDialogActions,
        MatLegacyDialogContent], imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule], exports: [MatLegacyDialogContainer,
        MatLegacyDialogClose,
        MatLegacyDialogTitle,
        MatLegacyDialogContent,
        MatLegacyDialogActions,
        MatCommonModule] });
MatLegacyDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, providers: [MatLegacyDialog, MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER], imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule],
                    exports: [
                        MatLegacyDialogContainer,
                        MatLegacyDialogClose,
                        MatLegacyDialogTitle,
                        MatLegacyDialogContent,
                        MatLegacyDialogActions,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatLegacyDialogContainer,
                        MatLegacyDialogClose,
                        MatLegacyDialogTitle,
                        MatLegacyDialogActions,
                        MatLegacyDialogContent,
                    ],
                    providers: [MatLegacyDialog, MAT_LEGACY_DIALOG_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktZGlhbG9nL2RpYWxvZy1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLDBDQUEwQyxFQUFFLGVBQWUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNyRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsb0JBQW9CLEdBQ3JCLE1BQU0sNkJBQTZCLENBQUM7O0FBRXJDOzs7R0FHRztBQW9CSCxNQUFNLE9BQU8scUJBQXFCOzt1SEFBckIscUJBQXFCO3dIQUFyQixxQkFBcUIsaUJBUjlCLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixzQkFBc0IsYUFkZCxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLGFBRWxFLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsZUFBZTt3SEFXTixxQkFBcUIsYUFGckIsQ0FBQyxlQUFlLEVBQUUsMENBQTBDLENBQUMsWUFoQjlELFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFPbEUsZUFBZTtnR0FXTixxQkFBcUI7a0JBbkJqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDckUsT0FBTyxFQUFFO3dCQUNQLHdCQUF3Qjt3QkFDeEIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0QixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osd0JBQXdCO3dCQUN4QixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixzQkFBc0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSwwQ0FBMEMsQ0FBQztpQkFDekUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kaWFsb2cnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1BvcnRhbE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TUFUX0xFR0FDWV9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLCBNYXRMZWdhY3lEaWFsb2d9IGZyb20gJy4vZGlhbG9nJztcbmltcG9ydCB7TWF0TGVnYWN5RGlhbG9nQ29udGFpbmVyfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXInO1xuaW1wb3J0IHtcbiAgTWF0TGVnYWN5RGlhbG9nQWN0aW9ucyxcbiAgTWF0TGVnYWN5RGlhbG9nQ2xvc2UsXG4gIE1hdExlZ2FjeURpYWxvZ0NvbnRlbnQsXG4gIE1hdExlZ2FjeURpYWxvZ1RpdGxlLFxufSBmcm9tICcuL2RpYWxvZy1jb250ZW50LWRpcmVjdGl2ZXMnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0RGlhbG9nTW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2dgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0RpYWxvZ01vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0TGVnYWN5RGlhbG9nQ29udGFpbmVyLFxuICAgIE1hdExlZ2FjeURpYWxvZ0Nsb3NlLFxuICAgIE1hdExlZ2FjeURpYWxvZ1RpdGxlLFxuICAgIE1hdExlZ2FjeURpYWxvZ0NvbnRlbnQsXG4gICAgTWF0TGVnYWN5RGlhbG9nQWN0aW9ucyxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdExlZ2FjeURpYWxvZ0NvbnRhaW5lcixcbiAgICBNYXRMZWdhY3lEaWFsb2dDbG9zZSxcbiAgICBNYXRMZWdhY3lEaWFsb2dUaXRsZSxcbiAgICBNYXRMZWdhY3lEaWFsb2dBY3Rpb25zLFxuICAgIE1hdExlZ2FjeURpYWxvZ0NvbnRlbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW01hdExlZ2FjeURpYWxvZywgTUFUX0xFR0FDWV9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5RGlhbG9nTW9kdWxlIHt9XG4iXX0=