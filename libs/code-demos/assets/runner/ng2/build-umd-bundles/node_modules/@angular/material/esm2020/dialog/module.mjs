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
import { MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatDialog } from './dialog';
import { MatDialogContainer } from './dialog-container';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, } from './dialog-content-directives';
import * as i0 from "@angular/core";
export class MatDialogModule {
}
MatDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogModule, declarations: [MatDialogContainer,
        MatDialogClose,
        MatDialogTitle,
        MatDialogActions,
        MatDialogContent], imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule], exports: [MatDialogContainer,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatCommonModule] });
MatDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogModule, providers: [MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER], imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DialogModule, OverlayModule, PortalModule, MatCommonModule],
                    exports: [
                        MatDialogContainer,
                        MatDialogClose,
                        MatDialogTitle,
                        MatDialogContent,
                        MatDialogActions,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatDialogContainer,
                        MatDialogClose,
                        MatDialogTitle,
                        MatDialogActions,
                        MatDialogContent,
                    ],
                    providers: [MatDialog, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2RpYWxvZy9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1DQUFtQyxFQUFFLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsY0FBYyxHQUNmLE1BQU0sNkJBQTZCLENBQUM7O0FBcUJyQyxNQUFNLE9BQU8sZUFBZTs7aUhBQWYsZUFBZTtrSEFBZixlQUFlLGlCQVJ4QixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsZ0JBQWdCLGFBZFIsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUVsRSxrQkFBa0I7UUFDbEIsY0FBYztRQUNkLGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7a0hBV04sZUFBZSxhQUZmLENBQUMsU0FBUyxFQUFFLG1DQUFtQyxDQUFDLFlBaEJqRCxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBT2xFLGVBQWU7Z0dBV04sZUFBZTtrQkFuQjNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUNyRSxPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCxnQkFBZ0I7d0JBQ2hCLGdCQUFnQjtxQkFDakI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLG1DQUFtQyxDQUFDO2lCQUM1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7UG9ydGFsTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNQVRfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiwgTWF0RGlhbG9nfSBmcm9tICcuL2RpYWxvZyc7XG5pbXBvcnQge01hdERpYWxvZ0NvbnRhaW5lcn0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyJztcbmltcG9ydCB7XG4gIE1hdERpYWxvZ0FjdGlvbnMsXG4gIE1hdERpYWxvZ0Nsb3NlLFxuICBNYXREaWFsb2dDb250ZW50LFxuICBNYXREaWFsb2dUaXRsZSxcbn0gZnJvbSAnLi9kaWFsb2ctY29udGVudC1kaXJlY3RpdmVzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0RpYWxvZ01vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0RGlhbG9nQ29udGFpbmVyLFxuICAgIE1hdERpYWxvZ0Nsb3NlLFxuICAgIE1hdERpYWxvZ1RpdGxlLFxuICAgIE1hdERpYWxvZ0NvbnRlbnQsXG4gICAgTWF0RGlhbG9nQWN0aW9ucyxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdERpYWxvZ0NvbnRhaW5lcixcbiAgICBNYXREaWFsb2dDbG9zZSxcbiAgICBNYXREaWFsb2dUaXRsZSxcbiAgICBNYXREaWFsb2dBY3Rpb25zLFxuICAgIE1hdERpYWxvZ0NvbnRlbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW01hdERpYWxvZywgTUFUX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREaWFsb2dNb2R1bGUge31cbiJdfQ==