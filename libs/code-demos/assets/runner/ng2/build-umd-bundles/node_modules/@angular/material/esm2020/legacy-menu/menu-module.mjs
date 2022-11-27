/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/menu';
import { MatLegacyMenu } from './menu';
import { MatLegacyMenuContent } from './menu-content';
import { MatLegacyMenuItem } from './menu-item';
import { MatLegacyMenuTrigger } from './menu-trigger';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatMenuModule` from `@angular/material/menu` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyMenuModule {
}
MatLegacyMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyMenuModule, declarations: [MatLegacyMenu, MatLegacyMenuItem, MatLegacyMenuTrigger, MatLegacyMenuContent], imports: [CommonModule, MatCommonModule, MatRippleModule, OverlayModule], exports: [CdkScrollableModule,
        MatCommonModule,
        MatLegacyMenu,
        MatLegacyMenuItem,
        MatLegacyMenuTrigger,
        MatLegacyMenuContent] });
MatLegacyMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyMenuModule, providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [CommonModule, MatCommonModule, MatRippleModule, OverlayModule, CdkScrollableModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCommonModule, MatRippleModule, OverlayModule],
                    exports: [
                        CdkScrollableModule,
                        MatCommonModule,
                        MatLegacyMenu,
                        MatLegacyMenuItem,
                        MatLegacyMenuTrigger,
                        MatLegacyMenuContent,
                    ],
                    declarations: [MatLegacyMenu, MatLegacyMenuItem, MatLegacyMenuTrigger, MatLegacyMenuContent],
                    providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LW1lbnUvbWVudS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNyQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRXBEOzs7R0FHRztBQWNILE1BQU0sT0FBTyxtQkFBbUI7O3FIQUFuQixtQkFBbUI7c0hBQW5CLG1CQUFtQixpQkFIZixhQUFhLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLGFBVGpGLFlBQVksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsYUFFckUsbUJBQW1CO1FBQ25CLGVBQWU7UUFDZixhQUFhO1FBQ2IsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixvQkFBb0I7c0hBS1gsbUJBQW1CLGFBRm5CLENBQUMseUNBQXlDLENBQUMsWUFWNUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUVyRSxtQkFBbUI7UUFDbkIsZUFBZTtnR0FTTixtQkFBbUI7a0JBYi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDO29CQUN4RSxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjtxQkFDckI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDO29CQUM1RixTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztpQkFDdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQge01hdExlZ2FjeU1lbnV9IGZyb20gJy4vbWVudSc7XG5pbXBvcnQge01hdExlZ2FjeU1lbnVDb250ZW50fSBmcm9tICcuL21lbnUtY29udGVudCc7XG5pbXBvcnQge01hdExlZ2FjeU1lbnVJdGVtfSBmcm9tICcuL21lbnUtaXRlbSc7XG5pbXBvcnQge01hdExlZ2FjeU1lbnVUcmlnZ2VyfSBmcm9tICcuL21lbnUtdHJpZ2dlcic7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRNZW51TW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9tZW51YCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIENka1Njcm9sbGFibGVNb2R1bGUsXG4gICAgTWF0Q29tbW9uTW9kdWxlLFxuICAgIE1hdExlZ2FjeU1lbnUsXG4gICAgTWF0TGVnYWN5TWVudUl0ZW0sXG4gICAgTWF0TGVnYWN5TWVudVRyaWdnZXIsXG4gICAgTWF0TGVnYWN5TWVudUNvbnRlbnQsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01hdExlZ2FjeU1lbnUsIE1hdExlZ2FjeU1lbnVJdGVtLCBNYXRMZWdhY3lNZW51VHJpZ2dlciwgTWF0TGVnYWN5TWVudUNvbnRlbnRdLFxuICBwcm92aWRlcnM6IFtNQVRfTUVOVV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeU1lbnVNb2R1bGUge31cbiJdfQ==