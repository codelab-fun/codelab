/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCommonModule } from '@angular/material/core';
import { MatLegacyOptionModule } from '@angular/material/legacy-core';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/autocomplete';
import { MatLegacyAutocomplete } from './autocomplete';
import { MatLegacyAutocompleteTrigger } from './autocomplete-trigger';
import { MatLegacyAutocompleteOrigin } from './autocomplete-origin';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatAutocompleteModule` from `@angular/material/autocomplete` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyAutocompleteModule {
}
MatLegacyAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyAutocompleteModule, declarations: [MatLegacyAutocomplete, MatLegacyAutocompleteTrigger, MatLegacyAutocompleteOrigin], imports: [OverlayModule, MatLegacyOptionModule, MatCommonModule, CommonModule], exports: [MatLegacyAutocomplete,
        MatLegacyAutocompleteTrigger,
        MatLegacyAutocompleteOrigin,
        CdkScrollableModule,
        MatLegacyOptionModule,
        MatCommonModule] });
MatLegacyAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyAutocompleteModule, providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [OverlayModule, MatLegacyOptionModule, MatCommonModule, CommonModule, CdkScrollableModule,
        MatLegacyOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, MatLegacyOptionModule, MatCommonModule, CommonModule],
                    exports: [
                        MatLegacyAutocomplete,
                        MatLegacyAutocompleteTrigger,
                        MatLegacyAutocompleteOrigin,
                        CdkScrollableModule,
                        MatLegacyOptionModule,
                        MatCommonModule,
                    ],
                    declarations: [MatLegacyAutocomplete, MatLegacyAutocompleteTrigger, MatLegacyAutocompleteOrigin],
                    providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9sZWdhY3ktYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsaURBQWlELEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFbEU7OztHQUdHO0FBY0gsTUFBTSxPQUFPLDJCQUEyQjs7NkhBQTNCLDJCQUEyQjs4SEFBM0IsMkJBQTJCLGlCQUh2QixxQkFBcUIsRUFBRSw0QkFBNEIsRUFBRSwyQkFBMkIsYUFUckYsYUFBYSxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxZQUFZLGFBRTNFLHFCQUFxQjtRQUNyQiw0QkFBNEI7UUFDNUIsMkJBQTJCO1FBQzNCLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsZUFBZTs4SEFLTiwyQkFBMkIsYUFGM0IsQ0FBQyxpREFBaUQsQ0FBQyxZQVZwRCxhQUFhLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFLM0UsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixlQUFlO2dHQUtOLDJCQUEyQjtrQkFidkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUscUJBQXFCLEVBQUUsZUFBZSxFQUFFLFlBQVksQ0FBQztvQkFDOUUsT0FBTyxFQUFFO3dCQUNQLHFCQUFxQjt3QkFDckIsNEJBQTRCO3dCQUM1QiwyQkFBMkI7d0JBQzNCLG1CQUFtQjt3QkFDbkIscUJBQXFCO3dCQUNyQixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSw0QkFBNEIsRUFBRSwyQkFBMkIsQ0FBQztvQkFDaEcsU0FBUyxFQUFFLENBQUMsaURBQWlELENBQUM7aUJBQy9EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5T3B0aW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktY29yZSc7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRMZWdhY3lBdXRvY29tcGxldGV9IGZyb20gJy4vYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7TWF0TGVnYWN5QXV0b2NvbXBsZXRlVHJpZ2dlcn0gZnJvbSAnLi9hdXRvY29tcGxldGUtdHJpZ2dlcic7XG5pbXBvcnQge01hdExlZ2FjeUF1dG9jb21wbGV0ZU9yaWdpbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdEF1dG9jb21wbGV0ZU1vZHVsZWAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBNYXRMZWdhY3lPcHRpb25Nb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE1hdExlZ2FjeUF1dG9jb21wbGV0ZSxcbiAgICBNYXRMZWdhY3lBdXRvY29tcGxldGVUcmlnZ2VyLFxuICAgIE1hdExlZ2FjeUF1dG9jb21wbGV0ZU9yaWdpbixcbiAgICBDZGtTY3JvbGxhYmxlTW9kdWxlLFxuICAgIE1hdExlZ2FjeU9wdGlvbk1vZHVsZSxcbiAgICBNYXRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW01hdExlZ2FjeUF1dG9jb21wbGV0ZSwgTWF0TGVnYWN5QXV0b2NvbXBsZXRlVHJpZ2dlciwgTWF0TGVnYWN5QXV0b2NvbXBsZXRlT3JpZ2luXSxcbiAgcHJvdmlkZXJzOiBbTUFUX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUF1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIl19