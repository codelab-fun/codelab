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
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { SimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel } from './snack-bar-content';
import * as i0 from "@angular/core";
export class MatSnackBarModule {
}
MatSnackBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSnackBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, declarations: [SimpleSnackBar,
        MatSnackBarContainer,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction], imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule], exports: [MatCommonModule,
        MatSnackBarContainer,
        MatSnackBarLabel,
        MatSnackBarActions,
        MatSnackBarAction] });
MatSnackBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSnackBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule, CommonModule, MatButtonModule, MatCommonModule],
                    exports: [
                        MatCommonModule,
                        MatSnackBarContainer,
                        MatSnackBarLabel,
                        MatSnackBarActions,
                        MatSnackBarAction,
                    ],
                    declarations: [
                        SimpleSnackBar,
                        MatSnackBarContainer,
                        MatSnackBarLabel,
                        MatSnackBarActions,
                        MatSnackBarAction,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NuYWNrLWJhci9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7QUFtQjVGLE1BQU0sT0FBTyxpQkFBaUI7O21IQUFqQixpQkFBaUI7b0hBQWpCLGlCQUFpQixpQkFQMUIsY0FBYztRQUNkLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGlCQUFpQixhQWJULGFBQWEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLGFBRW5GLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixpQkFBaUI7b0hBVVIsaUJBQWlCLFlBaEJsQixhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUVuRixlQUFlO2dHQWNOLGlCQUFpQjtrQkFqQjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDdEYsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBQ2hCLGtCQUFrQjt3QkFDbEIsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osY0FBYzt3QkFDZCxvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixpQkFBaUI7cUJBQ2xCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtQb3J0YWxNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5pbXBvcnQge1NpbXBsZVNuYWNrQmFyfSBmcm9tICcuL3NpbXBsZS1zbmFjay1iYXInO1xuaW1wb3J0IHtNYXRTbmFja0JhckNvbnRhaW5lcn0gZnJvbSAnLi9zbmFjay1iYXItY29udGFpbmVyJztcbmltcG9ydCB7TWF0U25hY2tCYXJBY3Rpb24sIE1hdFNuYWNrQmFyQWN0aW9ucywgTWF0U25hY2tCYXJMYWJlbH0gZnJvbSAnLi9zbmFjay1iYXItY29udGVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGUsIENvbW1vbk1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyQ29udGFpbmVyLFxuICAgIE1hdFNuYWNrQmFyTGFiZWwsXG4gICAgTWF0U25hY2tCYXJBY3Rpb25zLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9uLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBTaW1wbGVTbmFja0JhcixcbiAgICBNYXRTbmFja0JhckNvbnRhaW5lcixcbiAgICBNYXRTbmFja0JhckxhYmVsLFxuICAgIE1hdFNuYWNrQmFyQWN0aW9ucyxcbiAgICBNYXRTbmFja0JhckFjdGlvbixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0U25hY2tCYXJNb2R1bGUge31cbiJdfQ==