/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbar, MatToolbarRow } from './toolbar';
import * as i0 from "@angular/core";
export class MatToolbarModule {
}
MatToolbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatToolbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatToolbarModule, declarations: [MatToolbar, MatToolbarRow], imports: [MatCommonModule], exports: [MatToolbar, MatToolbarRow, MatCommonModule] });
MatToolbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatToolbarModule, imports: [MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule],
                    exports: [MatToolbar, MatToolbarRow, MatCommonModule],
                    declarations: [MatToolbar, MatToolbarRow],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdG9vbGJhci90b29sYmFyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsVUFBVSxFQUFFLGFBQWEsRUFBQyxNQUFNLFdBQVcsQ0FBQzs7QUFPcEQsTUFBTSxPQUFPLGdCQUFnQjs7a0hBQWhCLGdCQUFnQjttSEFBaEIsZ0JBQWdCLGlCQUZaLFVBQVUsRUFBRSxhQUFhLGFBRjlCLGVBQWUsYUFDZixVQUFVLEVBQUUsYUFBYSxFQUFFLGVBQWU7bUhBR3pDLGdCQUFnQixZQUpqQixlQUFlLEVBQ1ksZUFBZTtnR0FHekMsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUM7b0JBQ3JELFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUM7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXRUb29sYmFyLCBNYXRUb29sYmFyUm93fSBmcm9tICcuL3Rvb2xiYXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW01hdFRvb2xiYXIsIE1hdFRvb2xiYXJSb3csIE1hdENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdFRvb2xiYXIsIE1hdFRvb2xiYXJSb3ddLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRUb29sYmFyTW9kdWxlIHt9XG4iXX0=