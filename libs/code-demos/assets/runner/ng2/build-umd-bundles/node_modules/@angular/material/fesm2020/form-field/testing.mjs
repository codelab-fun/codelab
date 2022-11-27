export { MatFormFieldControlHarness } from '@angular/material/form-field/testing/control';
import { ComponentHarness, HarnessPredicate, parallel } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatDatepickerInputHarness, MatDateRangeInputHarness } from '@angular/material/datepicker/testing';

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
class _MatErrorHarnessBase extends ComponentHarness {
    /** Gets a promise for the error's label text. */
    async getText() {
        return (await this.host()).text();
    }
    static _getErrorPredicate(type, options) {
        return new HarnessPredicate(type, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
    }
}
/** Harness for interacting with an MDC-based `mat-error` in tests. */
class MatErrorHarness extends _MatErrorHarnessBase {
    /**
     * Gets a `HarnessPredicate` that can be used to search for an error with specific
     * attributes.
     * @param options Options for filtering which error instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return _MatErrorHarnessBase._getErrorPredicate(this, options);
    }
}
MatErrorHarness.hostSelector = '.mat-mdc-form-field-error';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class _MatFormFieldHarnessBase extends ComponentHarness {
    /** Gets the label of the form-field. */
    async getLabel() {
        const labelEl = await this._label();
        return labelEl ? labelEl.text() : null;
    }
    /** Whether the form-field has errors. */
    async hasErrors() {
        return (await this.getTextErrors()).length > 0;
    }
    /** Whether the form-field is disabled. */
    async isDisabled() {
        return (await this.host()).hasClass('mat-form-field-disabled');
    }
    /** Whether the form-field is currently autofilled. */
    async isAutofilled() {
        return (await this.host()).hasClass('mat-form-field-autofilled');
    }
    // Implementation of the "getControl" method overload signatures.
    async getControl(type) {
        if (type) {
            return this.locatorForOptional(type)();
        }
        const [select, input, datepickerInput, dateRangeInput] = await parallel(() => [
            this._selectControl(),
            this._inputControl(),
            this._datepickerInputControl(),
            this._dateRangeInputControl(),
        ]);
        // Match the datepicker inputs first since they can also have a `MatInput`.
        return datepickerInput || dateRangeInput || select || input;
    }
    /** Gets the theme color of the form-field. */
    async getThemeColor() {
        const hostEl = await this.host();
        const [isAccent, isWarn] = await parallel(() => {
            return [hostEl.hasClass('mat-accent'), hostEl.hasClass('mat-warn')];
        });
        if (isAccent) {
            return 'accent';
        }
        else if (isWarn) {
            return 'warn';
        }
        return 'primary';
    }
    /** Gets error messages which are currently displayed in the form-field. */
    async getTextErrors() {
        const errors = await this.getErrors();
        return parallel(() => errors.map(e => e.getText()));
    }
    /** Gets all of the error harnesses in the form field. */
    async getErrors(filter = {}) {
        return this.locatorForAll(this._errorHarness.with(filter))();
    }
    /** Gets hint messages which are currently displayed in the form-field. */
    async getTextHints() {
        const hints = await this._hints();
        return parallel(() => hints.map(e => e.text()));
    }
    /** Gets the text inside the prefix element. */
    async getPrefixText() {
        const prefix = await this._prefixContainer();
        return prefix ? prefix.text() : '';
    }
    /** Gets the text inside the suffix element. */
    async getSuffixText() {
        const suffix = await this._suffixContainer();
        return suffix ? suffix.text() : '';
    }
    /**
     * Whether the form control has been touched. Returns "null"
     * if no form control is set up.
     */
    async isControlTouched() {
        if (!(await this._hasFormControl())) {
            return null;
        }
        return (await this.host()).hasClass('ng-touched');
    }
    /**
     * Whether the form control is dirty. Returns "null"
     * if no form control is set up.
     */
    async isControlDirty() {
        if (!(await this._hasFormControl())) {
            return null;
        }
        return (await this.host()).hasClass('ng-dirty');
    }
    /**
     * Whether the form control is valid. Returns "null"
     * if no form control is set up.
     */
    async isControlValid() {
        if (!(await this._hasFormControl())) {
            return null;
        }
        return (await this.host()).hasClass('ng-valid');
    }
    /**
     * Whether the form control is pending validation. Returns "null"
     * if no form control is set up.
     */
    async isControlPending() {
        if (!(await this._hasFormControl())) {
            return null;
        }
        return (await this.host()).hasClass('ng-pending');
    }
    /** Checks whether the form-field control has set up a form control. */
    async _hasFormControl() {
        const hostEl = await this.host();
        // If no form "NgControl" is bound to the form-field control, the form-field
        // is not able to forward any control status classes. Therefore if either the
        // "ng-touched" or "ng-untouched" class is set, we know that it has a form control
        const [isTouched, isUntouched] = await parallel(() => [
            hostEl.hasClass('ng-touched'),
            hostEl.hasClass('ng-untouched'),
        ]);
        return isTouched || isUntouched;
    }
}
/** Harness for interacting with a MDC-based form-field's in tests. */
class MatFormFieldHarness extends _MatFormFieldHarnessBase {
    constructor() {
        super(...arguments);
        this._prefixContainer = this.locatorForOptional('.mat-mdc-form-field-text-prefix');
        this._suffixContainer = this.locatorForOptional('.mat-mdc-form-field-text-suffix');
        this._label = this.locatorForOptional('.mdc-floating-label');
        this._hints = this.locatorForAll('.mat-mdc-form-field-hint');
        this._inputControl = this.locatorForOptional(MatInputHarness);
        this._selectControl = this.locatorForOptional(MatSelectHarness);
        this._datepickerInputControl = this.locatorForOptional(MatDatepickerInputHarness);
        this._dateRangeInputControl = this.locatorForOptional(MatDateRangeInputHarness);
        this._errorHarness = MatErrorHarness;
        this._mdcTextField = this.locatorFor('.mat-mdc-text-field-wrapper');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a form field with specific
     * attributes.
     * @param options Options for filtering which form field instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options)
            .addOption('floatingLabelText', options.floatingLabelText, async (harness, text) => HarnessPredicate.stringMatches(await harness.getLabel(), text))
            .addOption('hasErrors', options.hasErrors, async (harness, hasErrors) => (await harness.hasErrors()) === hasErrors);
    }
    /** Gets the appearance of the form-field. */
    async getAppearance() {
        const textFieldEl = await this._mdcTextField();
        if (await textFieldEl.hasClass('mdc-text-field--outlined')) {
            return 'outline';
        }
        return 'fill';
    }
    /** Whether the form-field has a label. */
    async hasLabel() {
        return (await this._label()) !== null;
    }
    /** Whether the label is currently floating. */
    async isLabelFloating() {
        const labelEl = await this._label();
        return labelEl !== null ? await labelEl.hasClass('mdc-floating-label--float-above') : false;
    }
}
MatFormFieldHarness.hostSelector = '.mat-mdc-form-field';

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

export { MatErrorHarness, MatFormFieldHarness, _MatErrorHarnessBase, _MatFormFieldHarnessBase };
//# sourceMappingURL=testing.mjs.map
