/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, inject } from '@angular/core';
import { MatInput as BaseMatInput } from '@angular/material/input';
import { MatLegacyFormFieldControl, MAT_LEGACY_FORM_FIELD, } from '@angular/material/legacy-form-field';
import * as i0 from "@angular/core";
/**
 * Directive that allows a native input to work inside a `MatFormField`.
 * @deprecated Use `MatInput` from `@angular/material/input` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyInput extends BaseMatInput {
    constructor() {
        super(...arguments);
        this._legacyFormField = inject(MAT_LEGACY_FORM_FIELD, { optional: true });
    }
    _getPlaceholder() {
        // If we're hiding the native placeholder, it should also be cleared from the DOM, otherwise
        // screen readers will read it out twice: once from the label and once from the attribute.
        // TODO: can be removed once we get rid of the `legacy` style for the form field, because it's
        // the only one that supports promoting the placeholder to a label.
        const formField = this._legacyFormField;
        return formField && formField.appearance === 'legacy' && !formField._hasLabel?.()
            ? null
            : this.placeholder;
    }
}
MatLegacyInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyInput, deps: null, target: i0.ɵɵFactoryTarget.Directive });
MatLegacyInput.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0-rc.1", type: MatLegacyInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],\n      input[matNativeControl], textarea[matNativeControl]", host: { properties: { "class.mat-input-server": "_isServer", "class.mat-mdc-input-element": "false", "class.mat-mdc-form-field-textarea-control": "false", "class.mat-mdc-form-field-input-control": "false", "class.mdc-text-field__input": "false", "class.mat-mdc-native-select-inline": "false", "attr.data-placeholder": "placeholder", "class.mat-native-select-inline": "_isInlineSelect()" }, classAttribute: "mat-input-element mat-form-field-autofill-control" }, providers: [{ provide: MatLegacyFormFieldControl, useExisting: MatLegacyInput }], exportAs: ["matInput"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0-rc.1", ngImport: i0, type: MatLegacyInput, decorators: [{
            type: Directive,
            args: [{
                    selector: `input[matInput], textarea[matInput], select[matNativeControl],
      input[matNativeControl], textarea[matNativeControl]`,
                    exportAs: 'matInput',
                    host: {
                        /**
                         * @breaking-change 8.0.0 remove .mat-form-field-autofill-control in favor of AutofillMonitor.
                         */
                        'class': 'mat-input-element mat-form-field-autofill-control',
                        '[class.mat-input-server]': '_isServer',
                        // These classes are inherited from the base input class and need to be cleared.
                        '[class.mat-mdc-input-element]': 'false',
                        '[class.mat-mdc-form-field-textarea-control]': 'false',
                        '[class.mat-mdc-form-field-input-control]': 'false',
                        '[class.mdc-text-field__input]': 'false',
                        '[class.mat-mdc-native-select-inline]': 'false',
                        // At the time of writing, we have a lot of customer tests that look up the input based on its
                        // placeholder. Since we sometimes omit the placeholder attribute from the DOM to prevent screen
                        // readers from reading it twice, we have to keep it somewhere in the DOM for the lookup.
                        '[attr.data-placeholder]': 'placeholder',
                        '[class.mat-native-select-inline]': '_isInlineSelect()',
                    },
                    providers: [{ provide: MatLegacyFormFieldControl, useExisting: MatLegacyInput }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LWlucHV0L2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUNMLHlCQUF5QixFQUV6QixxQkFBcUIsR0FDdEIsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFFN0M7Ozs7R0FJRztBQXlCSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFlBQVk7SUF4QmhEOztRQXlCVSxxQkFBZ0IsR0FBRyxNQUFNLENBQXFCLHFCQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FZaEc7SUFWb0IsZUFBZTtRQUNoQyw0RkFBNEY7UUFDNUYsMEZBQTBGO1FBQzFGLDhGQUE4RjtRQUM5RixtRUFBbUU7UUFDbkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ3hDLE9BQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQy9FLENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDdkIsQ0FBQzs7Z0hBWlUsY0FBYztvR0FBZCxjQUFjLGltQkFGZCxDQUFDLEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUMsQ0FBQztnR0FFbkUsY0FBYztrQkF4QjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFOzBEQUM4QztvQkFDeEQsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLElBQUksRUFBRTt3QkFDSjs7MkJBRUc7d0JBQ0gsT0FBTyxFQUFFLG1EQUFtRDt3QkFDNUQsMEJBQTBCLEVBQUUsV0FBVzt3QkFDdkMsZ0ZBQWdGO3dCQUNoRiwrQkFBK0IsRUFBRSxPQUFPO3dCQUN4Qyw2Q0FBNkMsRUFBRSxPQUFPO3dCQUN0RCwwQ0FBMEMsRUFBRSxPQUFPO3dCQUNuRCwrQkFBK0IsRUFBRSxPQUFPO3dCQUN4QyxzQ0FBc0MsRUFBRSxPQUFPO3dCQUMvQyw4RkFBOEY7d0JBQzlGLGdHQUFnRzt3QkFDaEcseUZBQXlGO3dCQUN6Rix5QkFBeUIsRUFBRSxhQUFhO3dCQUN4QyxrQ0FBa0MsRUFBRSxtQkFBbUI7cUJBQ3hEO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFdBQVcsZ0JBQWdCLEVBQUMsQ0FBQztpQkFDL0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdElucHV0IGFzIEJhc2VNYXRJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtcbiAgTWF0TGVnYWN5Rm9ybUZpZWxkQ29udHJvbCxcbiAgTWF0TGVnYWN5Rm9ybUZpZWxkLFxuICBNQVRfTEVHQUNZX0ZPUk1fRklFTEQsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xlZ2FjeS1mb3JtLWZpZWxkJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBhbGxvd3MgYSBuYXRpdmUgaW5wdXQgdG8gd29yayBpbnNpZGUgYSBgTWF0Rm9ybUZpZWxkYC5cbiAqIEBkZXByZWNhdGVkIFVzZSBgTWF0SW5wdXRgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL2lucHV0YCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYGlucHV0W21hdElucHV0XSwgdGV4dGFyZWFbbWF0SW5wdXRdLCBzZWxlY3RbbWF0TmF0aXZlQ29udHJvbF0sXG4gICAgICBpbnB1dFttYXROYXRpdmVDb250cm9sXSwgdGV4dGFyZWFbbWF0TmF0aXZlQ29udHJvbF1gLFxuICBleHBvcnRBczogJ21hdElucHV0JyxcbiAgaG9zdDoge1xuICAgIC8qKlxuICAgICAqIEBicmVha2luZy1jaGFuZ2UgOC4wLjAgcmVtb3ZlIC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sIGluIGZhdm9yIG9mIEF1dG9maWxsTW9uaXRvci5cbiAgICAgKi9cbiAgICAnY2xhc3MnOiAnbWF0LWlucHV0LWVsZW1lbnQgbWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbCcsXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtc2VydmVyXSc6ICdfaXNTZXJ2ZXInLFxuICAgIC8vIFRoZXNlIGNsYXNzZXMgYXJlIGluaGVyaXRlZCBmcm9tIHRoZSBiYXNlIGlucHV0IGNsYXNzIGFuZCBuZWVkIHRvIGJlIGNsZWFyZWQuXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWlucHV0LWVsZW1lbnRdJzogJ2ZhbHNlJyxcbiAgICAnW2NsYXNzLm1hdC1tZGMtZm9ybS1maWVsZC10ZXh0YXJlYS1jb250cm9sXSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLWZvcm0tZmllbGQtaW5wdXQtY29udHJvbF0nOiAnZmFsc2UnLFxuICAgICdbY2xhc3MubWRjLXRleHQtZmllbGRfX2lucHV0XSc6ICdmYWxzZScsXG4gICAgJ1tjbGFzcy5tYXQtbWRjLW5hdGl2ZS1zZWxlY3QtaW5saW5lXSc6ICdmYWxzZScsXG4gICAgLy8gQXQgdGhlIHRpbWUgb2Ygd3JpdGluZywgd2UgaGF2ZSBhIGxvdCBvZiBjdXN0b21lciB0ZXN0cyB0aGF0IGxvb2sgdXAgdGhlIGlucHV0IGJhc2VkIG9uIGl0c1xuICAgIC8vIHBsYWNlaG9sZGVyLiBTaW5jZSB3ZSBzb21ldGltZXMgb21pdCB0aGUgcGxhY2Vob2xkZXIgYXR0cmlidXRlIGZyb20gdGhlIERPTSB0byBwcmV2ZW50IHNjcmVlblxuICAgIC8vIHJlYWRlcnMgZnJvbSByZWFkaW5nIGl0IHR3aWNlLCB3ZSBoYXZlIHRvIGtlZXAgaXQgc29tZXdoZXJlIGluIHRoZSBET00gZm9yIHRoZSBsb29rdXAuXG4gICAgJ1thdHRyLmRhdGEtcGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAnW2NsYXNzLm1hdC1uYXRpdmUtc2VsZWN0LWlubGluZV0nOiAnX2lzSW5saW5lU2VsZWN0KCknLFxuICB9LFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTWF0TGVnYWN5Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1hdExlZ2FjeUlucHV0fV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeUlucHV0IGV4dGVuZHMgQmFzZU1hdElucHV0IHtcbiAgcHJpdmF0ZSBfbGVnYWN5Rm9ybUZpZWxkID0gaW5qZWN0PE1hdExlZ2FjeUZvcm1GaWVsZD4oTUFUX0xFR0FDWV9GT1JNX0ZJRUxELCB7b3B0aW9uYWw6IHRydWV9KTtcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2dldFBsYWNlaG9sZGVyKCkge1xuICAgIC8vIElmIHdlJ3JlIGhpZGluZyB0aGUgbmF0aXZlIHBsYWNlaG9sZGVyLCBpdCBzaG91bGQgYWxzbyBiZSBjbGVhcmVkIGZyb20gdGhlIERPTSwgb3RoZXJ3aXNlXG4gICAgLy8gc2NyZWVuIHJlYWRlcnMgd2lsbCByZWFkIGl0IG91dCB0d2ljZTogb25jZSBmcm9tIHRoZSBsYWJlbCBhbmQgb25jZSBmcm9tIHRoZSBhdHRyaWJ1dGUuXG4gICAgLy8gVE9ETzogY2FuIGJlIHJlbW92ZWQgb25jZSB3ZSBnZXQgcmlkIG9mIHRoZSBgbGVnYWN5YCBzdHlsZSBmb3IgdGhlIGZvcm0gZmllbGQsIGJlY2F1c2UgaXQnc1xuICAgIC8vIHRoZSBvbmx5IG9uZSB0aGF0IHN1cHBvcnRzIHByb21vdGluZyB0aGUgcGxhY2Vob2xkZXIgdG8gYSBsYWJlbC5cbiAgICBjb25zdCBmb3JtRmllbGQgPSB0aGlzLl9sZWdhY3lGb3JtRmllbGQ7XG4gICAgcmV0dXJuIGZvcm1GaWVsZCAmJiBmb3JtRmllbGQuYXBwZWFyYW5jZSA9PT0gJ2xlZ2FjeScgJiYgIWZvcm1GaWVsZC5faGFzTGFiZWw/LigpXG4gICAgICA/IG51bGxcbiAgICAgIDogdGhpcy5wbGFjZWhvbGRlcjtcbiAgfVxufVxuIl19