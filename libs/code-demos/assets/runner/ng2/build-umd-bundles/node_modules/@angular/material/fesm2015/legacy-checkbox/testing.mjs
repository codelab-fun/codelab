import { __awaiter } from 'tslib';
import { HarnessPredicate } from '@angular/cdk/testing';
import { _MatCheckboxHarnessBase } from '@angular/material/checkbox/testing';

/**
 * Harness for interacting with a standard mat-checkbox in tests.
 * @deprecated Use `MatCheckboxHarness` from `@angular/material/checkbox/testing` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
class MatLegacyCheckboxHarness extends _MatCheckboxHarnessBase {
    constructor() {
        super(...arguments);
        this._input = this.locatorFor('input');
        this._label = this.locatorFor('.mat-checkbox-label');
        this._inputContainer = this.locatorFor('.mat-checkbox-inner-container');
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a checkbox harness that meets
     * certain criteria.
     * @param options Options for filtering which checkbox instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return (new HarnessPredicate(MatLegacyCheckboxHarness, options)
            .addOption('label', options.label, (harness, label) => HarnessPredicate.stringMatches(harness.getLabelText(), label))
            // We want to provide a filter option for "name" because the name of the checkbox is
            // only set on the underlying input. This means that it's not possible for developers
            // to retrieve the harness of a specific checkbox with name through a CSS selector.
            .addOption('name', options.name, (harness, name) => __awaiter(this, void 0, void 0, function* () { return (yield harness.getName()) === name; }))
            .addOption('checked', options.checked, (harness, checked) => __awaiter(this, void 0, void 0, function* () { return (yield harness.isChecked()) == checked; })));
    }
    toggle() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._inputContainer()).click();
        });
    }
}
/** The selector for the host element of a checkbox instance. */
MatLegacyCheckboxHarness.hostSelector = '.mat-checkbox';

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

export { MatLegacyCheckboxHarness };
//# sourceMappingURL=testing.mjs.map
