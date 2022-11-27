/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatLegacyCheckbox } from './checkbox';
import { _MatCheckboxRequiredValidatorModule } from '@angular/material/checkbox';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatCheckboxModule` from `@angular/material/checkbox` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyCheckboxModule {
}
MatLegacyCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCheckboxModule, declarations: [MatLegacyCheckbox], imports: [MatRippleModule, MatCommonModule, ObserversModule, _MatCheckboxRequiredValidatorModule], exports: [MatLegacyCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule] });
MatLegacyCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCheckboxModule, imports: [MatRippleModule, MatCommonModule, ObserversModule, _MatCheckboxRequiredValidatorModule, MatCommonModule, _MatCheckboxRequiredValidatorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatRippleModule, MatCommonModule, ObserversModule, _MatCheckboxRequiredValidatorModule],
                    exports: [MatLegacyCheckbox, MatCommonModule, _MatCheckboxRequiredValidatorModule],
                    declarations: [MatLegacyCheckbox],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1jaGVja2JveC9jaGVja2JveC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFDLG1DQUFtQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7O0FBRS9FOzs7R0FHRztBQU1ILE1BQU0sT0FBTyx1QkFBdUI7O3lIQUF2Qix1QkFBdUI7MEhBQXZCLHVCQUF1QixpQkFGbkIsaUJBQWlCLGFBRnRCLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLG1DQUFtQyxhQUN0RixpQkFBaUIsRUFBRSxlQUFlLEVBQUUsbUNBQW1DOzBIQUd0RSx1QkFBdUIsWUFKeEIsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsbUNBQW1DLEVBQ25FLGVBQWUsRUFBRSxtQ0FBbUM7Z0dBR3RFLHVCQUF1QjtrQkFMbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxtQ0FBbUMsQ0FBQztvQkFDakcsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLG1DQUFtQyxDQUFDO29CQUNsRixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDbEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPYnNlcnZlcnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5Q2hlY2tib3h9IGZyb20gJy4vY2hlY2tib3gnO1xuaW1wb3J0IHtfTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0Q2hlY2tib3hNb2R1bGVgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94YCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXRSaXBwbGVNb2R1bGUsIE1hdENvbW1vbk1vZHVsZSwgT2JzZXJ2ZXJzTW9kdWxlLCBfTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvck1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRMZWdhY3lDaGVja2JveCwgTWF0Q29tbW9uTW9kdWxlLCBfTWF0Q2hlY2tib3hSZXF1aXJlZFZhbGlkYXRvck1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdExlZ2FjeUNoZWNrYm94XSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5Q2hlY2tib3hNb2R1bGUge31cbiJdfQ==