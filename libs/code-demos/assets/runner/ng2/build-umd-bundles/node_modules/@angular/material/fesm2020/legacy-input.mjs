import * as i0 from '@angular/core';
import { inject, Directive, NgModule } from '@angular/core';
import { MatInput } from '@angular/material/input';
export { MAT_INPUT_VALUE_ACCESSOR as MAT_LEGACY_INPUT_VALUE_ACCESSOR, getMatInputUnsupportedTypeError as getMatLegacyInputUnsupportedTypeError } from '@angular/material/input';
import { MAT_LEGACY_FORM_FIELD, MatLegacyFormFieldControl, MatLegacyFormFieldModule } from '@angular/material/legacy-form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCommonModule, ErrorStateMatcher } from '@angular/material/core';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive that allows a native input to work inside a `MatFormField`.
 * @deprecated Use `MatInput` from `@angular/material/input` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyInput extends MatInput {
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @deprecated Use `MatInputModule` from `@angular/material/input` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyInputModule {
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

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatLegacyInput, MatLegacyInputModule };
//# sourceMappingURL=legacy-input.mjs.map
