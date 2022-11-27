/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatLegacyRadioButton, MatLegacyRadioGroup } from './radio';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatRadioModule` from `@angular/material/radio` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyRadioModule {
}
MatLegacyRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRadioModule, declarations: [MatLegacyRadioGroup, MatLegacyRadioButton], imports: [MatRippleModule, MatCommonModule], exports: [MatLegacyRadioGroup, MatLegacyRadioButton, MatCommonModule] });
MatLegacyRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRadioModule, imports: [MatRippleModule, MatCommonModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, MatCommonModule],
                    exports: [MatLegacyRadioGroup, MatLegacyRadioButton, MatCommonModule],
                    declarations: [MatLegacyRadioGroup, MatLegacyRadioButton],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1yYWRpby9yYWRpby1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFNBQVMsQ0FBQzs7QUFFbEU7OztHQUdHO0FBTUgsTUFBTSxPQUFPLG9CQUFvQjs7c0hBQXBCLG9CQUFvQjt1SEFBcEIsb0JBQW9CLGlCQUZoQixtQkFBbUIsRUFBRSxvQkFBb0IsYUFGOUMsZUFBZSxFQUFFLGVBQWUsYUFDaEMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsZUFBZTt1SEFHekQsb0JBQW9CLFlBSnJCLGVBQWUsRUFBRSxlQUFlLEVBQ1csZUFBZTtnR0FHekQsb0JBQW9CO2tCQUxoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUM7b0JBQzNDLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGVBQWUsQ0FBQztvQkFDckUsWUFBWSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUM7aUJBQzFEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRDb21tb25Nb2R1bGUsIE1hdFJpcHBsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdExlZ2FjeVJhZGlvQnV0dG9uLCBNYXRMZWdhY3lSYWRpb0dyb3VwfSBmcm9tICcuL3JhZGlvJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdFJhZGlvTW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9yYWRpb2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0UmlwcGxlTW9kdWxlLCBNYXRDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWF0TGVnYWN5UmFkaW9Hcm91cCwgTWF0TGVnYWN5UmFkaW9CdXR0b24sIE1hdENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdExlZ2FjeVJhZGlvR3JvdXAsIE1hdExlZ2FjeVJhZGlvQnV0dG9uXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5UmFkaW9Nb2R1bGUge31cbiJdfQ==