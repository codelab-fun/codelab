/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from './drawer';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from './sidenav';
import * as i0 from "@angular/core";
export class MatSidenavModule {
}
MatSidenavModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSidenavModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavModule, declarations: [MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent], imports: [CommonModule, MatCommonModule, CdkScrollableModule], exports: [CdkScrollableModule,
        MatCommonModule,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent] });
MatSidenavModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavModule, imports: [CommonModule, MatCommonModule, CdkScrollableModule, CdkScrollableModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSidenavModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCommonModule, CdkScrollableModule],
                    exports: [
                        CdkScrollableModule,
                        MatCommonModule,
                        MatDrawer,
                        MatDrawerContainer,
                        MatDrawerContent,
                        MatSidenav,
                        MatSidenavContainer,
                        MatSidenavContent,
                    ],
                    declarations: [
                        MatDrawer,
                        MatDrawerContainer,
                        MatDrawerContent,
                        MatSidenav,
                        MatSidenavContainer,
                        MatSidenavContent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2lkZW5hdi9zaWRlbmF2LW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUN6RSxPQUFPLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDOztBQXVCN0UsTUFBTSxPQUFPLGdCQUFnQjs7a0hBQWhCLGdCQUFnQjttSEFBaEIsZ0JBQWdCLGlCQVJ6QixTQUFTO1FBQ1Qsa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGlCQUFpQixhQWpCVCxZQUFZLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixhQUUxRCxtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLFNBQVM7UUFDVCxrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsaUJBQWlCO21IQVdSLGdCQUFnQixZQXBCakIsWUFBWSxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFFMUQsbUJBQW1CO1FBQ25CLGVBQWU7Z0dBaUJOLGdCQUFnQjtrQkFyQjVCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQztvQkFDN0QsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsZUFBZTt3QkFDZixTQUFTO3dCQUNULGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3FCQUNsQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osU0FBUzt3QkFDVCxrQkFBa0I7d0JBQ2xCLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLGlCQUFpQjtxQkFDbEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Q2RrU2Nyb2xsYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXREcmF3ZXIsIE1hdERyYXdlckNvbnRhaW5lciwgTWF0RHJhd2VyQ29udGVudH0gZnJvbSAnLi9kcmF3ZXInO1xuaW1wb3J0IHtNYXRTaWRlbmF2LCBNYXRTaWRlbmF2Q29udGFpbmVyLCBNYXRTaWRlbmF2Q29udGVudH0gZnJvbSAnLi9zaWRlbmF2JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlLCBDZGtTY3JvbGxhYmxlTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIENka1Njcm9sbGFibGVNb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdERyYXdlcixcbiAgICBNYXREcmF3ZXJDb250YWluZXIsXG4gICAgTWF0RHJhd2VyQ29udGVudCxcbiAgICBNYXRTaWRlbmF2LFxuICAgIE1hdFNpZGVuYXZDb250YWluZXIsXG4gICAgTWF0U2lkZW5hdkNvbnRlbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdERyYXdlcixcbiAgICBNYXREcmF3ZXJDb250YWluZXIsXG4gICAgTWF0RHJhd2VyQ29udGVudCxcbiAgICBNYXRTaWRlbmF2LFxuICAgIE1hdFNpZGVuYXZDb250YWluZXIsXG4gICAgTWF0U2lkZW5hdkNvbnRlbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNpZGVuYXZNb2R1bGUge31cbiJdfQ==