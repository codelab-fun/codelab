import { __awaiter } from 'tslib';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatRadioGroupHarnessBase, _MatRadioButtonHarnessBase } from '@angular/material/radio/testing';

/**
 * Harness for interacting with a standard mat-radio-group in tests
 * @deprecated Use `MatRadioGroupHarness` from `@angular/material/radio/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyRadioGroupHarness extends _MatRadioGroupHarnessBase {
    constructor() {
        super(...arguments);
        this._buttonClass = MatLegacyRadioButtonHarness;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatRadioGroupHarness` that meets
     * certain criteria.
     * @param options Options for filtering which radio group instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyRadioGroupHarness, options).addOption('name', options.name, this._checkRadioGroupName);
    }
}
/** The selector for the host element of a `MatRadioGroup` instance. */
MatLegacyRadioGroupHarness.hostSelector = '.mat-radio-group';
/**
 * Harness for interacting with a standard mat-radio-button in tests.
 * @deprecated Use `MatRadioButtonHarness` from `@angular/material/radio/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyRadioButtonHarness extends _MatRadioButtonHarnessBase {
    constructor() {
        super(...arguments);
        this._textLabel = this.locatorFor('.mat-radio-label-content');
        this._clickLabel = this.locatorFor('.mat-radio-label');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `MatRadioButtonHarness` that meets
     * certain criteria.
     * @param options Options for filtering which radio button instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(MatLegacyRadioButtonHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
            .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; }))
            .addOption('checked', options.checked, (harness, checked) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isChecked()) == checked; }));
    }
}
/** The selector for the host element of a `MatRadioButton` instance. */
MatLegacyRadioButtonHarness.hostSelector = '.mat-radio-button';

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

export { MatLegacyRadioButtonHarness, MatLegacyRadioGroupHarness };
//# sourceMappingURL=testing.mjs.map
