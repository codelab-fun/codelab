/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatMenu } from './menu';
import { MatMenuItem } from './menu-item';
import { MatMenuContent } from './menu-content';
import { MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER, MatMenuTrigger } from './menu-trigger';
import * as i0 from "@angular/core";
export class MatMenuModule {
}
MatMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatMenuModule, declarations: [MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger], imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule], exports: [CdkScrollableModule,
        MatMenu,
        MatCommonModule,
        MatMenuItem,
        MatMenuContent,
        MatMenuTrigger] });
MatMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatMenuModule, providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule, CdkScrollableModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule],
                    exports: [
                        CdkScrollableModule,
                        MatMenu,
                        MatCommonModule,
                        MatMenuItem,
                        MatMenuContent,
                        MatMenuTrigger,
                    ],
                    declarations: [MatMenu, MatMenuItem, MatMenuContent, MatMenuTrigger],
                    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21lbnUvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDL0IsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHlDQUF5QyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQWV6RixNQUFNLE9BQU8sYUFBYTs7K0dBQWIsYUFBYTtnSEFBYixhQUFhLGlCQUhULE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGNBQWMsYUFUekQsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxhQUVyRSxtQkFBbUI7UUFDbkIsT0FBTztRQUNQLGVBQWU7UUFDZixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7Z0hBS0wsYUFBYSxhQUZiLENBQUMseUNBQXlDLENBQUMsWUFWNUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUVyRSxtQkFBbUI7UUFFbkIsZUFBZTtnR0FRTixhQUFhO2tCQWJ6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztvQkFDeEUsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsT0FBTzt3QkFDUCxlQUFlO3dCQUNmLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxjQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztvQkFDcEUsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7aUJBQ3ZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtDZGtTY3JvbGxhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7TWF0TWVudX0gZnJvbSAnLi9tZW51JztcbmltcG9ydCB7TWF0TWVudUl0ZW19IGZyb20gJy4vbWVudS1pdGVtJztcbmltcG9ydCB7TWF0TWVudUNvbnRlbnR9IGZyb20gJy4vbWVudS1jb250ZW50JztcbmltcG9ydCB7TUFUX01FTlVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIsIE1hdE1lbnVUcmlnZ2VyfSBmcm9tICcuL21lbnUtdHJpZ2dlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIENka1Njcm9sbGFibGVNb2R1bGUsXG4gICAgTWF0TWVudSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gICAgTWF0TWVudUl0ZW0sXG4gICAgTWF0TWVudUNvbnRlbnQsXG4gICAgTWF0TWVudVRyaWdnZXIsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01hdE1lbnUsIE1hdE1lbnVJdGVtLCBNYXRNZW51Q29udGVudCwgTWF0TWVudVRyaWdnZXJdLFxuICBwcm92aWRlcnM6IFtNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdE1lbnVNb2R1bGUge31cbiJdfQ==