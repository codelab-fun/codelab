/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggle, MatButtonToggleGroup } from './button-toggle';
import * as i0 from "@angular/core";
export class MatButtonToggleModule {
}
MatButtonToggleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatButtonToggleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonToggleModule, declarations: [MatButtonToggleGroup, MatButtonToggle], imports: [MatCommonModule, MatRippleModule], exports: [MatCommonModule, MatButtonToggleGroup, MatButtonToggle] });
MatButtonToggleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonToggleModule, imports: [MatCommonModule, MatRippleModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatButtonToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, MatRippleModule],
                    exports: [MatCommonModule, MatButtonToggleGroup, MatButtonToggle],
                    declarations: [MatButtonToggleGroup, MatButtonToggle],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXRvZ2dsZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZS9idXR0b24tdG9nZ2xlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQU90RSxNQUFNLE9BQU8scUJBQXFCOzt1SEFBckIscUJBQXFCO3dIQUFyQixxQkFBcUIsaUJBRmpCLG9CQUFvQixFQUFFLGVBQWUsYUFGMUMsZUFBZSxFQUFFLGVBQWUsYUFDaEMsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGVBQWU7d0hBR3JELHFCQUFxQixZQUp0QixlQUFlLEVBQUUsZUFBZSxFQUNoQyxlQUFlO2dHQUdkLHFCQUFxQjtrQkFMakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUMzQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxDQUFDO29CQUNqRSxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUM7aUJBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZSwgTWF0QnV0dG9uVG9nZ2xlR3JvdXB9IGZyb20gJy4vYnV0dG9uLXRvZ2dsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIE1hdEJ1dHRvblRvZ2dsZUdyb3VwLCBNYXRCdXR0b25Ub2dnbGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRCdXR0b25Ub2dnbGVHcm91cCwgTWF0QnV0dG9uVG9nZ2xlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlIHt9XG4iXX0=