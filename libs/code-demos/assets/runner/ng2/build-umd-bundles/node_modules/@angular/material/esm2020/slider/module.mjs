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
import { MatSlider } from './slider';
import { MatSliderVisualThumb } from './slider-thumb';
import { MatSliderThumb, MatSliderRangeThumb } from './slider-input';
import * as i0 from "@angular/core";
export class MatSliderModule {
}
MatSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSliderModule, declarations: [MatSlider, MatSliderThumb, MatSliderRangeThumb, MatSliderVisualThumb], imports: [MatCommonModule, CommonModule, MatRippleModule], exports: [MatSlider, MatSliderThumb, MatSliderRangeThumb] });
MatSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSliderModule, imports: [MatCommonModule, CommonModule, MatRippleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, MatRippleModule],
                    exports: [MatSlider, MatSliderThumb, MatSliderRangeThumb],
                    declarations: [MatSlider, MatSliderThumb, MatSliderRangeThumb, MatSliderVisualThumb],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NsaWRlci9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxjQUFjLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFPbkUsTUFBTSxPQUFPLGVBQWU7O2lIQUFmLGVBQWU7a0hBQWYsZUFBZSxpQkFGWCxTQUFTLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixhQUZ6RSxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsYUFDOUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxtQkFBbUI7a0hBRzdDLGVBQWUsWUFKaEIsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlO2dHQUk3QyxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixDQUFDO29CQUN6RCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDO2lCQUNyRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdFNsaWRlcn0gZnJvbSAnLi9zbGlkZXInO1xuaW1wb3J0IHtNYXRTbGlkZXJWaXN1YWxUaHVtYn0gZnJvbSAnLi9zbGlkZXItdGh1bWInO1xuaW1wb3J0IHtNYXRTbGlkZXJUaHVtYiwgTWF0U2xpZGVyUmFuZ2VUaHVtYn0gZnJvbSAnLi9zbGlkZXItaW5wdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRTbGlkZXIsIE1hdFNsaWRlclRodW1iLCBNYXRTbGlkZXJSYW5nZVRodW1iXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0U2xpZGVyLCBNYXRTbGlkZXJUaHVtYiwgTWF0U2xpZGVyUmFuZ2VUaHVtYiwgTWF0U2xpZGVyVmlzdWFsVGh1bWJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTbGlkZXJNb2R1bGUge31cbiJdfQ==