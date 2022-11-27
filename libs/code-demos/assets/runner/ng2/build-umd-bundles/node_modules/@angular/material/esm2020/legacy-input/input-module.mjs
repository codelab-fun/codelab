/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';
import { ErrorStateMatcher, MatCommonModule } from '@angular/material/core';
import { MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInput } from './input';
import * as i0 from "@angular/core";
/**
 * @deprecated Use `MatInputModule` from `@angular/material/input` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyInputModule {
}
MatLegacyInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MatLegacyInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyInputModule, declarations: [MatLegacyInput], imports: [TextFieldModule, MatLegacyFormFieldModule, MatCommonModule], exports: [TextFieldModule,
        // We re-export the `MatLegacyFormFieldModule` since `MatLegacyInput` will almost always
        // be used together with `MatLegacyFormField`.
        MatLegacyFormFieldModule,
        MatLegacyInput] });
MatLegacyInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyInputModule, providers: [ErrorStateMatcher], imports: [TextFieldModule, MatLegacyFormFieldModule, MatCommonModule, TextFieldModule,
        // We re-export the `MatLegacyFormFieldModule` since `MatLegacyInput` will almost always
        // be used together with `MatLegacyFormField`.
        MatLegacyFormFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MatLegacyInput],
                    imports: [TextFieldModule, MatLegacyFormFieldModule, MatCommonModule],
                    exports: [
                        TextFieldModule,
                        // We re-export the `MatLegacyFormFieldModule` since `MatLegacyInput` will almost always
                        // be used together with `MatLegacyFormField`.
                        MatLegacyFormFieldModule,
                        MatLegacyInput,
                    ],
                    providers: [ErrorStateMatcher],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2xlZ2FjeS1pbnB1dC9pbnB1dC1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzdFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxTQUFTLENBQUM7O0FBRXZDOzs7R0FHRztBQWFILE1BQU0sT0FBTyxvQkFBb0I7O3NIQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQixpQkFYaEIsY0FBYyxhQUNuQixlQUFlLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxhQUVsRSxlQUFlO1FBQ2Ysd0ZBQXdGO1FBQ3hGLDhDQUE4QztRQUM5Qyx3QkFBd0I7UUFDeEIsY0FBYzt1SEFJTCxvQkFBb0IsYUFGcEIsQ0FBQyxpQkFBaUIsQ0FBQyxZQVJwQixlQUFlLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxFQUVsRSxlQUFlO1FBQ2Ysd0ZBQXdGO1FBQ3hGLDhDQUE4QztRQUM5Qyx3QkFBd0I7Z0dBS2Ysb0JBQW9CO2tCQVpoQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDOUIsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLHdCQUF3QixFQUFFLGVBQWUsQ0FBQztvQkFDckUsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2Ysd0ZBQXdGO3dCQUN4Riw4Q0FBOEM7d0JBQzlDLHdCQUF3Qjt3QkFDeEIsY0FBYztxQkFDZjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUZXh0RmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXh0LWZpZWxkJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFcnJvclN0YXRlTWF0Y2hlciwgTWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TGVnYWN5Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9sZWdhY3ktZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdExlZ2FjeUlucHV0fSBmcm9tICcuL2lucHV0JztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYE1hdElucHV0TW9kdWxlYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC9pbnB1dGAgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtNYXRMZWdhY3lJbnB1dF0sXG4gIGltcG9ydHM6IFtUZXh0RmllbGRNb2R1bGUsIE1hdExlZ2FjeUZvcm1GaWVsZE1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIFRleHRGaWVsZE1vZHVsZSxcbiAgICAvLyBXZSByZS1leHBvcnQgdGhlIGBNYXRMZWdhY3lGb3JtRmllbGRNb2R1bGVgIHNpbmNlIGBNYXRMZWdhY3lJbnB1dGAgd2lsbCBhbG1vc3QgYWx3YXlzXG4gICAgLy8gYmUgdXNlZCB0b2dldGhlciB3aXRoIGBNYXRMZWdhY3lGb3JtRmllbGRgLlxuICAgIE1hdExlZ2FjeUZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRMZWdhY3lJbnB1dCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbRXJyb3JTdGF0ZU1hdGNoZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRMZWdhY3lJbnB1dE1vZHVsZSB7fVxuIl19