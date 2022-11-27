/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatError } from './directives/error';
import { MatFormFieldFloatingLabel } from './directives/floating-label';
import { MatHint } from './directives/hint';
import { MatLabel } from './directives/label';
import { MatFormFieldLineRipple } from './directives/line-ripple';
import { MatFormFieldNotchedOutline } from './directives/notched-outline';
import { MatPrefix } from './directives/prefix';
import { MatSuffix } from './directives/suffix';
import { MatFormField } from './form-field';
import * as i0 from "@angular/core";
export class MatFormFieldModule {
}
MatFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldModule, declarations: [MatFormField,
        MatLabel,
        MatError,
        MatHint,
        MatPrefix,
        MatSuffix,
        MatFormFieldFloatingLabel,
        MatFormFieldNotchedOutline,
        MatFormFieldLineRipple], imports: [MatCommonModule, CommonModule, ObserversModule], exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule] });
MatFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldModule, imports: [MatCommonModule, CommonModule, ObserversModule, MatCommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatCommonModule, CommonModule, ObserversModule],
                    exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule],
                    declarations: [
                        MatFormField,
                        MatLabel,
                        MatError,
                        MatHint,
                        MatPrefix,
                        MatSuffix,
                        MatFormFieldFloatingLabel,
                        MatFormFieldNotchedOutline,
                        MatFormFieldLineRipple,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tZmllbGQvbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDOztBQWlCMUMsTUFBTSxPQUFPLGtCQUFrQjs7b0hBQWxCLGtCQUFrQjtxSEFBbEIsa0JBQWtCLGlCQVgzQixZQUFZO1FBQ1osUUFBUTtRQUNSLFFBQVE7UUFDUixPQUFPO1FBQ1AsU0FBUztRQUNULFNBQVM7UUFDVCx5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLHNCQUFzQixhQVhkLGVBQWUsRUFBRSxZQUFZLEVBQUUsZUFBZSxhQUM5QyxZQUFZLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxlQUFlO3FIQWEvRSxrQkFBa0IsWUFkbkIsZUFBZSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQ21CLGVBQWU7Z0dBYS9FLGtCQUFrQjtrQkFmOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztvQkFDekQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDO29CQUMzRixZQUFZLEVBQUU7d0JBQ1osWUFBWTt3QkFDWixRQUFRO3dCQUNSLFFBQVE7d0JBQ1IsT0FBTzt3QkFDUCxTQUFTO3dCQUNULFNBQVM7d0JBQ1QseUJBQXlCO3dCQUN6QiwwQkFBMEI7d0JBQzFCLHNCQUFzQjtxQkFDdkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPYnNlcnZlcnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vYnNlcnZlcnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0RXJyb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9lcnJvcic7XG5pbXBvcnQge01hdEZvcm1GaWVsZEZsb2F0aW5nTGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9mbG9hdGluZy1sYWJlbCc7XG5pbXBvcnQge01hdEhpbnR9IGZyb20gJy4vZGlyZWN0aXZlcy9oaW50JztcbmltcG9ydCB7TWF0TGFiZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9sYWJlbCc7XG5pbXBvcnQge01hdEZvcm1GaWVsZExpbmVSaXBwbGV9IGZyb20gJy4vZGlyZWN0aXZlcy9saW5lLXJpcHBsZSc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE5vdGNoZWRPdXRsaW5lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbm90Y2hlZC1vdXRsaW5lJztcbmltcG9ydCB7TWF0UHJlZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvcHJlZml4JztcbmltcG9ydCB7TWF0U3VmZml4fSBmcm9tICcuL2RpcmVjdGl2ZXMvc3VmZml4JztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkfSBmcm9tICcuL2Zvcm0tZmllbGQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWF0Q29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGUsIE9ic2VydmVyc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRGb3JtRmllbGQsIE1hdExhYmVsLCBNYXRIaW50LCBNYXRFcnJvciwgTWF0UHJlZml4LCBNYXRTdWZmaXgsIE1hdENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdEZvcm1GaWVsZCxcbiAgICBNYXRMYWJlbCxcbiAgICBNYXRFcnJvcixcbiAgICBNYXRIaW50LFxuICAgIE1hdFByZWZpeCxcbiAgICBNYXRTdWZmaXgsXG4gICAgTWF0Rm9ybUZpZWxkRmxvYXRpbmdMYWJlbCxcbiAgICBNYXRGb3JtRmllbGROb3RjaGVkT3V0bGluZSxcbiAgICBNYXRGb3JtRmllbGRMaW5lUmlwcGxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRGb3JtRmllbGRNb2R1bGUge31cbiJdfQ==