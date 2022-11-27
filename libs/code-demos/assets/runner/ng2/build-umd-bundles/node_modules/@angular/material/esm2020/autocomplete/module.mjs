/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatAutocomplete } from './autocomplete';
import { MatAutocompleteTrigger, MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER, } from './autocomplete-trigger';
import { MatAutocompleteOrigin } from './autocomplete-origin';
import * as i0 from "@angular/core";
export class MatAutocompleteModule {
}
MatAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAutocompleteModule, declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin], imports: [OverlayModule, MatOptionModule, MatCommonModule, CommonModule], exports: [CdkScrollableModule,
        MatAutocomplete,
        MatOptionModule,
        MatCommonModule,
        MatAutocompleteTrigger,
        MatAutocompleteOrigin] });
MatAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAutocompleteModule, providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [OverlayModule, MatOptionModule, MatCommonModule, CommonModule, CdkScrollableModule,
        MatOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, MatOptionModule, MatCommonModule, CommonModule],
                    exports: [
                        CdkScrollableModule,
                        MatAutocomplete,
                        MatOptionModule,
                        MatCommonModule,
                        MatAutocompleteTrigger,
                        MatAutocompleteOrigin,
                    ],
                    declarations: [MatAutocomplete, MatAutocompleteTrigger, MatAutocompleteOrigin],
                    providers: [MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2F1dG9jb21wbGV0ZS9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsaURBQWlELEdBQ2xELE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7O0FBZTVELE1BQU0sT0FBTyxxQkFBcUI7O3VIQUFyQixxQkFBcUI7d0hBQXJCLHFCQUFxQixpQkFIakIsZUFBZSxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixhQVRuRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLGFBRXJFLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixzQkFBc0I7UUFDdEIscUJBQXFCO3dIQUtaLHFCQUFxQixhQUZyQixDQUFDLGlEQUFpRCxDQUFDLFlBVnBELGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFFckUsbUJBQW1CO1FBRW5CLGVBQWU7UUFDZixlQUFlO2dHQU9OLHFCQUFxQjtrQkFiakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3hFLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixlQUFlO3dCQUNmLHNCQUFzQjt3QkFDdEIscUJBQXFCO3FCQUN0QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLENBQUM7b0JBQzlFLFNBQVMsRUFBRSxDQUFDLGlEQUFpRCxDQUFDO2lCQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlLCBNYXRPcHRpb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Nka1Njcm9sbGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZX0gZnJvbSAnLi9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtcbiAgTWF0QXV0b2NvbXBsZXRlVHJpZ2dlcixcbiAgTUFUX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUixcbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtdHJpZ2dlcic7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZU9yaWdpbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW092ZXJsYXlNb2R1bGUsIE1hdE9wdGlvbk1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrU2Nyb2xsYWJsZU1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVUcmlnZ2VyLFxuICAgIE1hdEF1dG9jb21wbGV0ZU9yaWdpbixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0QXV0b2NvbXBsZXRlLCBNYXRBdXRvY29tcGxldGVUcmlnZ2VyLCBNYXRBdXRvY29tcGxldGVPcmlnaW5dLFxuICBwcm92aWRlcnM6IFtNQVRfQVVUT0NPTVBMRVRFX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXX0=