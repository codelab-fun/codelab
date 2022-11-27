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
import { MatSlideToggle } from './slide-toggle';
import { MatSlideToggleRequiredValidator } from './slide-toggle-required-validator';
import * as i0 from "@angular/core";
/** This module is used by both original and MDC-based slide-toggle implementations. */
export class _MatSlideToggleRequiredValidatorModule {
}
_MatSlideToggleRequiredValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSlideToggleRequiredValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
_MatSlideToggleRequiredValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSlideToggleRequiredValidatorModule, declarations: [MatSlideToggleRequiredValidator], exports: [MatSlideToggleRequiredValidator] });
_MatSlideToggleRequiredValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSlideToggleRequiredValidatorModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: _MatSlideToggleRequiredValidatorModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [MatSlideToggleRequiredValidator],
                    declarations: [MatSlideToggleRequiredValidator],
                }]
        }] });
export class MatSlideToggleModule {
}
MatSlideToggleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSlideToggleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatSlideToggleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSlideToggleModule, declarations: [MatSlideToggle], imports: [_MatSlideToggleRequiredValidatorModule, MatCommonModule, MatRippleModule, CommonModule], exports: [_MatSlideToggleRequiredValidatorModule, MatSlideToggle, MatCommonModule] });
MatSlideToggleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSlideToggleModule, imports: [_MatSlideToggleRequiredValidatorModule, MatCommonModule, MatRippleModule, CommonModule, _MatSlideToggleRequiredValidatorModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatSlideToggleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [_MatSlideToggleRequiredValidatorModule, MatCommonModule, MatRippleModule, CommonModule],
                    exports: [_MatSlideToggleRequiredValidatorModule, MatSlideToggle, MatCommonModule],
                    declarations: [MatSlideToggle],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NsaWRlLXRvZ2dsZS9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7O0FBRWxGLHVGQUF1RjtBQUt2RixNQUFNLE9BQU8sc0NBQXNDOzt3SUFBdEMsc0NBQXNDO3lJQUF0QyxzQ0FBc0MsaUJBRmxDLCtCQUErQixhQURwQywrQkFBK0I7eUlBRzlCLHNDQUFzQztnR0FBdEMsc0NBQXNDO2tCQUpsRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMxQyxZQUFZLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDaEQ7O0FBUUQsTUFBTSxPQUFPLG9CQUFvQjs7c0hBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGlCQUZoQixjQUFjLGFBTGxCLHNDQUFzQyxFQUdDLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxhQUhyRixzQ0FBc0MsRUFJQyxjQUFjLEVBQUUsZUFBZTt1SEFHdEUsb0JBQW9CLFlBSnJCLHNDQUFzQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUhyRixzQ0FBc0MsRUFJaUIsZUFBZTtnR0FHdEUsb0JBQW9CO2tCQUxoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLHNDQUFzQyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUNqRyxPQUFPLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDO29CQUNsRixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGV9IGZyb20gJy4vc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVSZXF1aXJlZFZhbGlkYXRvcn0gZnJvbSAnLi9zbGlkZS10b2dnbGUtcmVxdWlyZWQtdmFsaWRhdG9yJztcblxuLyoqIFRoaXMgbW9kdWxlIGlzIHVzZWQgYnkgYm90aCBvcmlnaW5hbCBhbmQgTURDLWJhc2VkIHNsaWRlLXRvZ2dsZSBpbXBsZW1lbnRhdGlvbnMuICovXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbTWF0U2xpZGVUb2dnbGVSZXF1aXJlZFZhbGlkYXRvcl0sXG4gIGRlY2xhcmF0aW9uczogW01hdFNsaWRlVG9nZ2xlUmVxdWlyZWRWYWxpZGF0b3JdLFxufSlcbmV4cG9ydCBjbGFzcyBfTWF0U2xpZGVUb2dnbGVSZXF1aXJlZFZhbGlkYXRvck1vZHVsZSB7fVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbX01hdFNsaWRlVG9nZ2xlUmVxdWlyZWRWYWxpZGF0b3JNb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlLCBDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbX01hdFNsaWRlVG9nZ2xlUmVxdWlyZWRWYWxpZGF0b3JNb2R1bGUsIE1hdFNsaWRlVG9nZ2xlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNYXRTbGlkZVRvZ2dsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNsaWRlVG9nZ2xlTW9kdWxlIHt9XG4iXX0=