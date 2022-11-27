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
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatSelect, MatSelectTrigger, MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from './select';
import * as i0 from "@angular/core";
export class MatSelectModule {
}
MatSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSelectModule, declarations: [MatSelect, MatSelectTrigger], imports: [CommonModule, OverlayModule, MatOptionModule, MatCommonModule], exports: [CdkScrollableModule,
        MatFormFieldModule,
        MatSelect,
        MatSelectTrigger,
        MatOptionModule,
        MatCommonModule] });
MatSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSelectModule, providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER], imports: [CommonModule, OverlayModule, MatOptionModule, MatCommonModule, CdkScrollableModule,
        MatFormFieldModule,
        MatOptionModule,
        MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, MatOptionModule, MatCommonModule],
                    exports: [
                        CdkScrollableModule,
                        MatFormFieldModule,
                        MatSelect,
                        MatSelectTrigger,
                        MatOptionModule,
                        MatCommonModule,
                    ],
                    declarations: [MatSelect, MatSelectTrigger],
                    providers: [MAT_SELECT_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NlbGVjdC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxtQ0FBbUMsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7QUFlMUYsTUFBTSxPQUFPLGVBQWU7O2lIQUFmLGVBQWU7a0hBQWYsZUFBZSxpQkFIWCxTQUFTLEVBQUUsZ0JBQWdCLGFBVGhDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsYUFFckUsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixTQUFTO1FBQ1QsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixlQUFlO2tIQUtOLGVBQWUsYUFGZixDQUFDLG1DQUFtQyxDQUFDLFlBVnRDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFFckUsbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUdsQixlQUFlO1FBQ2YsZUFBZTtnR0FLTixlQUFlO2tCQWIzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztvQkFDeEUsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixTQUFTO3dCQUNULGdCQUFnQjt3QkFDaEIsZUFBZTt3QkFDZixlQUFlO3FCQUNoQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUM7b0JBQzNDLFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO2lCQUNqRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7Q2RrU2Nyb2xsYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge01hdFNlbGVjdCwgTWF0U2VsZWN0VHJpZ2dlciwgTUFUX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJ9IGZyb20gJy4vc2VsZWN0JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgQ2RrU2Nyb2xsYWJsZU1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0U2VsZWN0LFxuICAgIE1hdFNlbGVjdFRyaWdnZXIsXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxuICAgIE1hdENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0U2VsZWN0LCBNYXRTZWxlY3RUcmlnZ2VyXSxcbiAgcHJvdmlkZXJzOiBbTUFUX1NFTEVDVF9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTZWxlY3RNb2R1bGUge31cbiJdfQ==